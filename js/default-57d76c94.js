(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]')) i(a);
    new MutationObserver(a => {
        for (const r of a)
            if (r.type === "childList")
                for (const s of r.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && i(s)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function o(a) {
        const r = {};
        return a.integrity && (r.integrity = a.integrity), a.referrerPolicy && (r.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? r.credentials = "include" : a.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }

    function i(a) {
        if (a.ep) return;
        a.ep = !0;
        const r = o(a);
        fetch(a.href, r)
    }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ze = globalThis,
    St = Ze.ShadowRoot && (Ze.ShadyCSS === void 0 || Ze.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    xt = Symbol(),
    Lt = new WeakMap;
let xo = class {
    constructor(e, o, i) {
        if (this._$cssResult$ = !0, i !== xt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = e, this.t = o
    }
    get styleSheet() {
        let e = this.o;
        const o = this.t;
        if (St && e === void 0) {
            const i = o !== void 0 && o.length === 1;
            i && (e = Lt.get(o)), e === void 0 && ((this.o = e = new CSSStyleSheet).replaceSync(this.cssText), i && Lt.set(o, e))
        }
        return e
    }
    toString() {
        return this.cssText
    }
};
const mi = t => new xo(typeof t == "string" ? t : t + "", void 0, xt),
    L = (t, ...e) => {
        const o = t.length === 1 ? t[0] : e.reduce((i, a, r) => i + (s => {
            if (s._$cssResult$ === !0) return s.cssText;
            if (typeof s == "number") return s;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")
        })(a) + t[r + 1], t[0]);
        return new xo(o, t, xt)
    },
    hi = (t, e) => {
        if (St) t.adoptedStyleSheets = e.map(o => o instanceof CSSStyleSheet ? o : o.styleSheet);
        else
            for (const o of e) {
                const i = document.createElement("style"),
                    a = Ze.litNonce;
                a !== void 0 && i.setAttribute("nonce", a), i.textContent = o.cssText, t.appendChild(i)
            }
    },
    It = St ? t => t : t => t instanceof CSSStyleSheet ? (e => {
        let o = "";
        for (const i of e.cssRules) o += i.cssText;
        return mi(o)
    })(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
    is: fi,
    defineProperty: wi,
    getOwnPropertyDescriptor: gi,
    getOwnPropertyNames: yi,
    getOwnPropertySymbols: zi,
    getPrototypeOf: bi
} = Object, ie = globalThis, Ut = ie.trustedTypes, ki = Ut ? Ut.emptyScript : "", lt = ie.reactiveElementPolyfillSupport, Pe = (t, e) => t, Xe = {
    toAttribute(t, e) {
        switch (e) {
            case Boolean:
                t = t ? ki : null;
                break;
            case Object:
            case Array:
                t = t == null ? t : JSON.stringify(t)
        }
        return t
    },
    fromAttribute(t, e) {
        let o = t;
        switch (e) {
            case Boolean:
                o = t !== null;
                break;
            case Number:
                o = t === null ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    o = JSON.parse(t)
                } catch {
                    o = null
                }
        }
        return o
    }
}, At = (t, e) => !fi(t, e), Nt = {
    attribute: !0,
    type: String,
    converter: Xe,
    reflect: !1,
    hasChanged: At
};
Symbol.metadata ? ? (Symbol.metadata = Symbol("metadata")), ie.litPropertyMetadata ? ? (ie.litPropertyMetadata = new WeakMap);
let ye = class extends HTMLElement {
    static addInitializer(e) {
        this._$Ei(), (this.l ? ? (this.l = [])).push(e)
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()]
    }
    static createProperty(e, o = Nt) {
        if (o.state && (o.attribute = !1), this._$Ei(), this.elementProperties.set(e, o), !o.noAccessor) {
            const i = Symbol(),
                a = this.getPropertyDescriptor(e, i, o);
            a !== void 0 && wi(this.prototype, e, a)
        }
    }
    static getPropertyDescriptor(e, o, i) {
        const {
            get: a,
            set: r
        } = gi(this.prototype, e) ? ? {
            get() {
                return this[o]
            },
            set(s) {
                this[o] = s
            }
        };
        return {
            get() {
                return a == null ? void 0 : a.call(this)
            },
            set(s) {
                const l = a == null ? void 0 : a.call(this);
                r.call(this, s), this.requestUpdate(e, l, i)
            },
            configurable: !0,
            enumerable: !0
        }
    }
    static getPropertyOptions(e) {
        return this.elementProperties.get(e) ? ? Nt
    }
    static _$Ei() {
        if (this.hasOwnProperty(Pe("elementProperties"))) return;
        const e = bi(this);
        e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties)
    }
    static finalize() {
        if (this.hasOwnProperty(Pe("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Pe("properties"))) {
            const o = this.properties,
                i = [...yi(o), ...zi(o)];
            for (const a of i) this.createProperty(a, o[a])
        }
        const e = this[Symbol.metadata];
        if (e !== null) {
            const o = litPropertyMetadata.get(e);
            if (o !== void 0)
                for (const [i, a] of o) this.elementProperties.set(i, a)
        }
        this._$Eh = new Map;
        for (const [o, i] of this.elementProperties) {
            const a = this._$Eu(o, i);
            a !== void 0 && this._$Eh.set(a, o)
        }
        this.elementStyles = this.finalizeStyles(this.styles)
    }
    static finalizeStyles(e) {
        const o = [];
        if (Array.isArray(e)) {
            const i = new Set(e.flat(1 / 0).reverse());
            for (const a of i) o.unshift(It(a))
        } else e !== void 0 && o.push(It(e));
        return o
    }
    static _$Eu(e, o) {
        const i = o.attribute;
        return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0
    }
    constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev()
    }
    _$Ev() {
        var e;
        this._$ES = new Promise(o => this.enableUpdating = o), this._$AL = new Map, this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach(o => o(this))
    }
    addController(e) {
        var o;
        (this._$EO ? ? (this._$EO = new Set)).add(e), this.renderRoot !== void 0 && this.isConnected && ((o = e.hostConnected) == null || o.call(e))
    }
    removeController(e) {
        var o;
        (o = this._$EO) == null || o.delete(e)
    }
    _$E_() {
        const e = new Map,
            o = this.constructor.elementProperties;
        for (const i of o.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
        e.size > 0 && (this._$Ep = e)
    }
    createRenderRoot() {
        const e = this.shadowRoot ? ? this.attachShadow(this.constructor.shadowRootOptions);
        return hi(e, this.constructor.elementStyles), e
    }
    connectedCallback() {
        var e;
        this.renderRoot ? ? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach(o => {
            var i;
            return (i = o.hostConnected) == null ? void 0 : i.call(o)
        })
    }
    enableUpdating(e) {}
    disconnectedCallback() {
        var e;
        (e = this._$EO) == null || e.forEach(o => {
            var i;
            return (i = o.hostDisconnected) == null ? void 0 : i.call(o)
        })
    }
    attributeChangedCallback(e, o, i) {
        this._$AK(e, i)
    }
    _$EC(e, o) {
        var r;
        const i = this.constructor.elementProperties.get(e),
            a = this.constructor._$Eu(e, i);
        if (a !== void 0 && i.reflect === !0) {
            const s = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Xe).toAttribute(o, i.type);
            this._$Em = e, s == null ? this.removeAttribute(a) : this.setAttribute(a, s), this._$Em = null
        }
    }
    _$AK(e, o) {
        var r;
        const i = this.constructor,
            a = i._$Eh.get(e);
        if (a !== void 0 && this._$Em !== a) {
            const s = i.getPropertyOptions(a),
                l = typeof s.converter == "function" ? {
                    fromAttribute: s.converter
                } : ((r = s.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? s.converter : Xe;
            this._$Em = a, this[a] = l.fromAttribute(o, s.type), this._$Em = null
        }
    }
    requestUpdate(e, o, i) {
        if (e !== void 0) {
            if (i ? ? (i = this.constructor.getPropertyOptions(e)), !(i.hasChanged ? ? At)(this[e], o)) return;
            this.P(e, o, i)
        }
        this.isUpdatePending === !1 && (this._$ES = this._$ET())
    }
    P(e, o, i) {
        this._$AL.has(e) || this._$AL.set(e, o), i.reflect === !0 && this._$Em !== e && (this._$Ej ? ? (this._$Ej = new Set)).add(e)
    }
    async _$ET() {
        this.isUpdatePending = !0;
        try {
            await this._$ES
        } catch (o) {
            Promise.reject(o)
        }
        const e = this.scheduleUpdate();
        return e != null && await e, !this.isUpdatePending
    }
    scheduleUpdate() {
        return this.performUpdate()
    }
    performUpdate() {
        var i;
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ? ? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
                for (const [r, s] of this._$Ep) this[r] = s;
                this._$Ep = void 0
            }
            const a = this.constructor.elementProperties;
            if (a.size > 0)
                for (const [r, s] of a) s.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.P(r, this[r], s)
        }
        let e = !1;
        const o = this._$AL;
        try {
            e = this.shouldUpdate(o), e ? (this.willUpdate(o), (i = this._$EO) == null || i.forEach(a => {
                var r;
                return (r = a.hostUpdate) == null ? void 0 : r.call(a)
            }), this.update(o)) : this._$EU()
        } catch (a) {
            throw e = !1, this._$EU(), a
        }
        e && this._$AE(o)
    }
    willUpdate(e) {}
    _$AE(e) {
        var o;
        (o = this._$EO) == null || o.forEach(i => {
            var a;
            return (a = i.hostUpdated) == null ? void 0 : a.call(i)
        }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e)
    }
    _$EU() {
        this._$AL = new Map, this.isUpdatePending = !1
    }
    get updateComplete() {
        return this.getUpdateComplete()
    }
    getUpdateComplete() {
        return this._$ES
    }
    shouldUpdate(e) {
        return !0
    }
    update(e) {
        this._$Ej && (this._$Ej = this._$Ej.forEach(o => this._$EC(o, this[o]))), this._$EU()
    }
    updated(e) {}
    firstUpdated(e) {}
};
ye.elementStyles = [], ye.shadowRootOptions = {
    mode: "open"
}, ye[Pe("elementProperties")] = new Map, ye[Pe("finalized")] = new Map, lt == null || lt({
    ReactiveElement: ye
}), (ie.reactiveElementVersions ? ? (ie.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = globalThis,
    Ye = Me.trustedTypes,
    Vt = Ye ? Ye.createPolicy("lit-html", {
        createHTML: t => t
    }) : void 0,
    Tt = "$lit$",
    te = `lit$${(Math.random()+"").slice(9)}$`,
    Wt = "?" + te,
    vi = `<${Wt}>`,
    de = document,
    xe = () => de.createComment(""),
    Ae = t => t === null || typeof t != "object" && typeof t != "function",
    Ao = Array.isArray,
    To = t => Ao(t) || typeof(t == null ? void 0 : t[Symbol.iterator]) == "function",
    dt = `[ 	
\f\r]`,
    je = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    Ft = /-->/g,
    Ht = />/g,
    ne = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"),
    Kt = /'/g,
    Bt = /"/g,
    Wo = /^(?:script|style|textarea|title)$/i,
    _i = t => (e, ...o) => ({
        _$litType$: t,
        strings: e,
        values: o
    }),
    c = _i(1),
    F = Symbol.for("lit-noChange"),
    m = Symbol.for("lit-nothing"),
    Jt = new WeakMap,
    ce = de.createTreeWalker(de, 129);

function Co(t, e) {
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return Vt !== void 0 ? Vt.createHTML(e) : e
}
const Eo = (t, e) => {
    const o = t.length - 1,
        i = [];
    let a, r = e === 2 ? "<svg>" : "",
        s = je;
    for (let l = 0; l < o; l++) {
        const d = t[l];
        let u, w, p = -1,
            b = 0;
        for (; b < d.length && (s.lastIndex = b, w = s.exec(d), w !== null);) b = s.lastIndex, s === je ? w[1] === "!--" ? s = Ft : w[1] !== void 0 ? s = Ht : w[2] !== void 0 ? (Wo.test(w[2]) && (a = RegExp("</" + w[2], "g")), s = ne) : w[3] !== void 0 && (s = ne) : s === ne ? w[0] === ">" ? (s = a ? ? je, p = -1) : w[1] === void 0 ? p = -2 : (p = s.lastIndex - w[2].length, u = w[1], s = w[3] === void 0 ? ne : w[3] === '"' ? Bt : Kt) : s === Bt || s === Kt ? s = ne : s === Ft || s === Ht ? s = je : (s = ne, a = void 0);
        const z = s === ne && t[l + 1].startsWith("/>") ? " " : "";
        r += s === je ? d + vi : p >= 0 ? (i.push(u), d.slice(0, p) + Tt + d.slice(p) + te + z) : d + te + (p === -2 ? l : z)
    }
    return [Co(t, r + (t[o] || "<?>") + (e === 2 ? "</svg>" : "")), i]
};
class Te {
    constructor({
        strings: e,
        _$litType$: o
    }, i) {
        let a;
        this.parts = [];
        let r = 0,
            s = 0;
        const l = e.length - 1,
            d = this.parts,
            [u, w] = Eo(e, o);
        if (this.el = Te.createElement(u, i), ce.currentNode = this.el.content, o === 2) {
            const p = this.el.content.firstChild;
            p.replaceWith(...p.childNodes)
        }
        for (;
            (a = ce.nextNode()) !== null && d.length < l;) {
            if (a.nodeType === 1) {
                if (a.hasAttributes())
                    for (const p of a.getAttributeNames())
                        if (p.endsWith(Tt)) {
                            const b = w[s++],
                                z = a.getAttribute(p).split(te),
                                P = /([.?@])?(.*)/.exec(b);
                            d.push({
                                type: 1,
                                index: r,
                                name: P[2],
                                strings: z,
                                ctor: P[1] === "." ? Ro : P[1] === "?" ? Oo : P[1] === "@" ? Lo : Le
                            }), a.removeAttribute(p)
                        } else p.startsWith(te) && (d.push({
                            type: 6,
                            index: r
                        }), a.removeAttribute(p));
                if (Wo.test(a.tagName)) {
                    const p = a.textContent.split(te),
                        b = p.length - 1;
                    if (b > 0) {
                        a.textContent = Ye ? Ye.emptyScript : "";
                        for (let z = 0; z < b; z++) a.append(p[z], xe()), ce.nextNode(), d.push({
                            type: 2,
                            index: ++r
                        });
                        a.append(p[b], xe())
                    }
                }
            } else if (a.nodeType === 8)
                if (a.data === Wt) d.push({
                    type: 2,
                    index: r
                });
                else {
                    let p = -1;
                    for (;
                        (p = a.data.indexOf(te, p + 1)) !== -1;) d.push({
                        type: 7,
                        index: r
                    }), p += te.length - 1
                }
            r++
        }
    }
    static createElement(e, o) {
        const i = de.createElement("template");
        return i.innerHTML = e, i
    }
}

function ue(t, e, o = t, i) {
    var s, l;
    if (e === F) return e;
    let a = i !== void 0 ? (s = o._$Co) == null ? void 0 : s[i] : o._$Cl;
    const r = Ae(e) ? void 0 : e._$litDirective$;
    return (a == null ? void 0 : a.constructor) !== r && ((l = a == null ? void 0 : a._$AO) == null || l.call(a, !1), r === void 0 ? a = void 0 : (a = new r(t), a._$AT(t, o, i)), i !== void 0 ? (o._$Co ? ? (o._$Co = []))[i] = a : o._$Cl = a), a !== void 0 && (e = ue(t, a._$AS(t, e.values), a, i)), e
}
class Do {
    constructor(e, o) {
        this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = o
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    u(e) {
        const {
            el: {
                content: o
            },
            parts: i
        } = this._$AD, a = ((e == null ? void 0 : e.creationScope) ? ? de).importNode(o, !0);
        ce.currentNode = a;
        let r = ce.nextNode(),
            s = 0,
            l = 0,
            d = i[0];
        for (; d !== void 0;) {
            if (s === d.index) {
                let u;
                d.type === 2 ? u = new ve(r, r.nextSibling, this, e) : d.type === 1 ? u = new d.ctor(r, d.name, d.strings, this, e) : d.type === 6 && (u = new Io(r, this, e)), this._$AV.push(u), d = i[++l]
            }
            s !== (d == null ? void 0 : d.index) && (r = ce.nextNode(), s++)
        }
        return ce.currentNode = de, a
    }
    p(e) {
        let o = 0;
        for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, o), o += i.strings.length - 2) : i._$AI(e[o])), o++
    }
}
class ve {
    get _$AU() {
        var e;
        return ((e = this._$AM) == null ? void 0 : e._$AU) ? ? this._$Cv
    }
    constructor(e, o, i, a) {
        this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = o, this._$AM = i, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ? ? !0
    }
    get parentNode() {
        let e = this._$AA.parentNode;
        const o = this._$AM;
        return o !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = o.parentNode), e
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(e, o = this) {
        e = ue(this, e, o), Ae(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== F && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : To(e) ? this.k(e) : this._(e)
    }
    S(e) {
        return this._$AA.parentNode.insertBefore(e, this._$AB)
    }
    T(e) {
        this._$AH !== e && (this._$AR(), this._$AH = this.S(e))
    }
    _(e) {
        this._$AH !== m && Ae(this._$AH) ? this._$AA.nextSibling.data = e : this.T(de.createTextNode(e)), this._$AH = e
    }
    $(e) {
        var r;
        const {
            values: o,
            _$litType$: i
        } = e, a = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Te.createElement(Co(i.h, i.h[0]), this.options)), i);
        if (((r = this._$AH) == null ? void 0 : r._$AD) === a) this._$AH.p(o);
        else {
            const s = new Do(a, this),
                l = s.u(this.options);
            s.p(o), this.T(l), this._$AH = s
        }
    }
    _$AC(e) {
        let o = Jt.get(e.strings);
        return o === void 0 && Jt.set(e.strings, o = new Te(e)), o
    }
    k(e) {
        Ao(this._$AH) || (this._$AH = [], this._$AR());
        const o = this._$AH;
        let i, a = 0;
        for (const r of e) a === o.length ? o.push(i = new ve(this.S(xe()), this.S(xe()), this, this.options)) : i = o[a], i._$AI(r), a++;
        a < o.length && (this._$AR(i && i._$AB.nextSibling, a), o.length = a)
    }
    _$AR(e = this._$AA.nextSibling, o) {
        var i;
        for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, o); e && e !== this._$AB;) {
            const a = e.nextSibling;
            e.remove(), e = a
        }
    }
    setConnected(e) {
        var o;
        this._$AM === void 0 && (this._$Cv = e, (o = this._$AP) == null || o.call(this, e))
    }
}
class Le {
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    constructor(e, o, i, a, r) {
        this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = o, this._$AM = a, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String), this.strings = i) : this._$AH = m
    }
    _$AI(e, o = this, i, a) {
        const r = this.strings;
        let s = !1;
        if (r === void 0) e = ue(this, e, o, 0), s = !Ae(e) || e !== this._$AH && e !== F, s && (this._$AH = e);
        else {
            const l = e;
            let d, u;
            for (e = r[0], d = 0; d < r.length - 1; d++) u = ue(this, l[i + d], o, d), u === F && (u = this._$AH[d]), s || (s = !Ae(u) || u !== this._$AH[d]), u === m ? e = m : e !== m && (e += (u ? ? "") + r[d + 1]), this._$AH[d] = u
        }
        s && !a && this.j(e)
    }
    j(e) {
        e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ? ? "")
    }
}
class Ro extends Le {
    constructor() {
        super(...arguments), this.type = 3
    }
    j(e) {
        this.element[this.name] = e === m ? void 0 : e
    }
}
class Oo extends Le {
    constructor() {
        super(...arguments), this.type = 4
    }
    j(e) {
        this.element.toggleAttribute(this.name, !!e && e !== m)
    }
}
class Lo extends Le {
    constructor(e, o, i, a, r) {
        super(e, o, i, a, r), this.type = 5
    }
    _$AI(e, o = this) {
        if ((e = ue(this, e, o, 0) ? ? m) === F) return;
        const i = this._$AH,
            a = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive,
            r = e !== m && (i === m || a);
        a && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, e), this._$AH = e
    }
    handleEvent(e) {
        var o;
        typeof this._$AH == "function" ? this._$AH.call(((o = this.options) == null ? void 0 : o.host) ? ? this.element, e) : this._$AH.handleEvent(e)
    }
}
class Io {
    constructor(e, o, i) {
        this.element = e, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = i
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(e) {
        ue(this, e)
    }
}
const ji = {
        P: Tt,
        A: te,
        C: Wt,
        M: 1,
        L: Eo,
        R: Do,
        D: To,
        V: ue,
        I: ve,
        H: Le,
        N: Oo,
        U: Lo,
        B: Ro,
        F: Io
    },
    ut = Me.litHtmlPolyfillSupport;
ut == null || ut(Te, ve), (Me.litHtmlVersions ? ? (Me.litHtmlVersions = [])).push("3.1.2");
const $i = (t, e, o) => {
    const i = (o == null ? void 0 : o.renderBefore) ? ? e;
    let a = i._$litPart$;
    if (a === void 0) {
        const r = (o == null ? void 0 : o.renderBefore) ? ? null;
        i._$litPart$ = a = new ve(e.insertBefore(xe(), r), r, void 0, o ? ? {})
    }
    return a._$AI(t), a
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let ze = class extends ye {
    constructor() {
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0
    }
    createRenderRoot() {
        var o;
        const e = super.createRenderRoot();
        return (o = this.renderOptions).renderBefore ? ? (o.renderBefore = e.firstChild), e
    }
    update(e) {
        const o = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $i(o, this.renderRoot, this.renderOptions)
    }
    connectedCallback() {
        var e;
        super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0)
    }
    disconnectedCallback() {
        var e;
        super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1)
    }
    render() {
        return F
    }
};
var So;
ze._$litElement$ = !0, ze.finalized = !0, (So = globalThis.litElementHydrateSupport) == null || So.call(globalThis, {
    LitElement: ze
});
const pt = globalThis.litElementPolyfillSupport;
pt == null || pt({
    LitElement: ze
});
(globalThis.litElementVersions ? ? (globalThis.litElementVersions = [])).push("4.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = t => (e, o) => {
    o !== void 0 ? o.addInitializer(() => {
        customElements.define(t, e)
    }) : customElements.define(t, e)
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pi = {
        attribute: !0,
        type: String,
        converter: Xe,
        reflect: !1,
        hasChanged: At
    },
    Mi = (t = Pi, e, o) => {
        const {
            kind: i,
            metadata: a
        } = o;
        let r = globalThis.litPropertyMetadata.get(a);
        if (r === void 0 && globalThis.litPropertyMetadata.set(a, r = new Map), r.set(o.name, t), i === "accessor") {
            const {
                name: s
            } = o;
            return {
                set(l) {
                    const d = e.get.call(this);
                    e.set.call(this, l), this.requestUpdate(s, d, t)
                },
                init(l) {
                    return l !== void 0 && this.P(s, void 0, t), l
                }
            }
        }
        if (i === "setter") {
            const {
                name: s
            } = o;
            return function(l) {
                const d = this[s];
                e.call(this, l), this.requestUpdate(s, d, t)
            }
        }
        throw Error("Unsupported decorator location: " + i)
    };

function A(t) {
    return (e, o) => typeof o == "object" ? Mi(t, e, o) : ((i, a, r) => {
        const s = a.hasOwnProperty(r);
        return a.constructor.createProperty(r, s ? { ...i,
            wrapped: !0
        } : i), s ? Object.getOwnPropertyDescriptor(a, r) : void 0
    })(t, e, o)
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function E(t) {
    return A({ ...t,
        state: !0,
        attribute: !1
    })
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = (t, e, o) => (o.configurable = !0, o.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, o), o);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(t, e) {
    return (o, i, a) => {
        const r = s => {
            var l;
            return ((l = s.renderRoot) == null ? void 0 : l.querySelector(t)) ? ? null
        };
        if (e) {
            const {
                get: s,
                set: l
            } = typeof i == "object" ? o : a ? ? (() => {
                const d = Symbol();
                return {
                    get() {
                        return this[d]
                    },
                    set(u) {
                        this[d] = u
                    }
                }
            })();
            return qt(o, i, {
                get() {
                    let d = s.call(this);
                    return d === void 0 && (d = r(this), (d !== null || this.hasUpdated) && l.call(this, d)), d
                }
            })
        }
        return qt(o, i, {
            get() {
                return r(this)
            }
        })
    }
}
const Si = L `
  :host {
    box-sizing: border-box;
    font-family: var(--adm-font-sans);
    -webkit-font-smoothing: antialiased;
    color: var(--adm-font-base);
  }
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }
  [hidden] {
    display: none !important;
  }
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  button,
  input,
  select {
    margin: 0;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  img,
  video {
    max-width: 100%;
    height: auto;
  }
`,
    xi = "modulepreload",
    Ai = function(t, e) {
        return new URL(t, e).href
    },
    Zt = {},
    J = function(e, o, i) {
        if (!o || o.length === 0) return e();
        const a = document.getElementsByTagName("link");
        return Promise.all(o.map(r => {
            if (r = Ai(r, i), r in Zt) return;
            Zt[r] = !0;
            const s = r.endsWith(".css"),
                l = s ? '[rel="stylesheet"]' : "";
            if (!!i)
                for (let w = a.length - 1; w >= 0; w--) {
                    const p = a[w];
                    if (p.href === r && (!s || p.rel === "stylesheet")) return
                } else if (document.querySelector(`link[href="${r}"]${l}`)) return;
            const u = document.createElement("link");
            if (u.rel = s ? "stylesheet" : xi, s || (u.as = "script", u.crossOrigin = ""), u.href = r, document.head.appendChild(u), s) return new Promise((w, p) => {
                u.addEventListener("load", w), u.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${r}`)))
            })
        })).then(() => e()).catch(r => {
            const s = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (s.payload = r, window.dispatchEvent(s), !s.defaultPrevented) throw r
        })
    },
    Ti = (t, e) => {
        const o = t[e];
        return o ? typeof o == "function" ? o() : Promise.resolve(o) : new Promise((i, a) => {
            (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + e)))
        })
    };
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wi = t => typeof t != "string" && "strTag" in t,
    Uo = (t, e, o) => {
        let i = t[0];
        for (let a = 1; a < t.length; a++) i += e[o ? o[a - 1] : a - 1], i += t[a];
        return i
    };
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const No = t => Wi(t) ? Uo(t.strings, t.values) : t;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = "lit-localize-status";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Ci {
    constructor(e) {
        this.__litLocalizeEventHandler = o => {
            o.detail.status === "ready" && this.host.requestUpdate()
        }, this.host = e
    }
    hostConnected() {
        window.addEventListener(vt, this.__litLocalizeEventHandler)
    }
    hostDisconnected() {
        window.removeEventListener(vt, this.__litLocalizeEventHandler)
    }
}
const Ei = t => t.addController(new Ci(t)),
    Di = Ei;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = () => (t, e) => (t.addInitializer(Di), t);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Vo {
    constructor() {
        this.settled = !1, this.promise = new Promise((e, o) => {
            this._resolve = e, this._reject = o
        })
    }
    resolve(e) {
        this.settled = !0, this._resolve(e)
    }
    reject(e) {
        this.settled = !0, this._reject(e)
    }
}
/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
const ee = [];
for (let t = 0; t < 256; t++) ee[t] = (t >> 4 & 15).toString(16) + (t & 15).toString(16);

function Ri(t) {
    let e = 0,
        o = 8997,
        i = 0,
        a = 33826,
        r = 0,
        s = 40164,
        l = 0,
        d = 52210;
    for (let u = 0; u < t.length; u++) o ^= t.charCodeAt(u), e = o * 435, i = a * 435, r = s * 435, l = d * 435, r += o << 8, l += a << 8, i += e >>> 16, o = e & 65535, r += i >>> 16, a = i & 65535, d = l + (r >>> 16) & 65535, s = r & 65535;
    return ee[d >> 8] + ee[d & 255] + ee[s >> 8] + ee[s & 255] + ee[a >> 8] + ee[a & 255] + ee[o >> 8] + ee[o & 255]
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oi = "",
    Li = "h",
    Ii = "s";

function Ui(t, e) {
    return (e ? Li : Ii) + Ri(typeof t == "string" ? t : t.join(Oi))
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = new WeakMap,
    Yt = new Map;

function Ni(t, e, o) {
    if (t) {
        const i = (o == null ? void 0 : o.id) ? ? Vi(e),
            a = t[i];
        if (a) {
            if (typeof a == "string") return a;
            if ("strTag" in a) return Uo(a.strings, e.values, a.values); {
                let r = Xt.get(a);
                return r === void 0 && (r = a.values, Xt.set(a, r)), { ...a,
                    values: r.map(s => e.values[s])
                }
            }
        }
    }
    return No(e)
}

function Vi(t) {
    const e = typeof t == "string" ? t : t.strings;
    let o = Yt.get(e);
    return o === void 0 && (o = Ui(e, typeof t != "string" && !("strTag" in t)), Yt.set(e, o)), o
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function mt(t) {
    window.dispatchEvent(new CustomEvent(vt, {
        detail: t
    }))
}
let Ge = "",
    ht, Fo, Qe, _t, Ho, se = new Vo;
se.resolve();
let Ke = 0;
const Fi = t => (Bi((e, o) => Ni(Ho, e, o)), Ge = Fo = t.sourceLocale, Qe = new Set(t.targetLocales), Qe.add(t.sourceLocale), _t = t.loadLocale, {
        getLocale: Hi,
        setLocale: Ki
    }),
    Hi = () => Ge,
    Ki = t => {
        if (t === (ht ? ? Ge)) return se.promise;
        if (!Qe || !_t) throw new Error("Internal error");
        if (!Qe.has(t)) throw new Error("Invalid locale code");
        Ke++;
        const e = Ke;
        return ht = t, se.settled && (se = new Vo), mt({
            status: "loading",
            loadingLocale: t
        }), (t === Fo ? Promise.resolve({
            templates: void 0
        }) : _t(t)).then(i => {
            Ke === e && (Ge = t, ht = void 0, Ho = i.templates, mt({
                status: "ready",
                readyLocale: t
            }), se.resolve())
        }, i => {
            Ke === e && (mt({
                status: "error",
                errorLocale: t,
                errorMessage: i.toString()
            }), se.reject(i))
        }), se.promise
    };
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let n = No,
    Gt = !1;

function Bi(t) {
    if (Gt) throw new Error("lit-localize can only be configured once");
    n = t, Gt = !0
}
const Ko = "pl",
    Ji = ["cs", "de", "de-AT", "es", "et", "hr", "hu", "it", "ro", "sk", "sl"],
    $ = {
        pathname: "ro-glamilips-lash-cp",
        cloakPath: "",
        pre: !1,
        language: qi("ro"),
        market: "ro",
        offerCode: "GLN",
        typ: "",
        category: "lips",
        flow: "upsell",
        confirm: !0,
        source: "",
        lock: !0,
        content: "",
        hideVoucher: !1
    };

function qi(t) {
    return t === "at" ? "de-AT" : t === "cz" ? "cs" : t === "ee" ? "et" : t === "si" ? "sl" : t
}
let Be;
const Zi = new Uint8Array(16);

function Xi() {
    if (!Be && (Be = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Be)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return Be(Zi)
}
const T = [];
for (let t = 0; t < 256; ++t) T.push((t + 256).toString(16).slice(1));

function Yi(t, e = 0) {
    return T[t[e + 0]] + T[t[e + 1]] + T[t[e + 2]] + T[t[e + 3]] + "-" + T[t[e + 4]] + T[t[e + 5]] + "-" + T[t[e + 6]] + T[t[e + 7]] + "-" + T[t[e + 8]] + T[t[e + 9]] + "-" + T[t[e + 10]] + T[t[e + 11]] + T[t[e + 12]] + T[t[e + 13]] + T[t[e + 14]] + T[t[e + 15]]
}
const Gi = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
    Qt = {
        randomUUID: Gi
    };

function Qi(t, e, o) {
    if (Qt.randomUUID && !e && !t) return Qt.randomUUID();
    t = t || {};
    const i = t.random || (t.rng || Xi)();
    if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, e) {
        o = o || 0;
        for (let a = 0; a < 16; ++a) e[o + a] = i[a];
        return e
    }
    return Yi(i)
}
const eo = {
    id: Qi(),
    expire: Date.now() + 5 * 24 * 60 * 60 * 1e3,
    source: window.location.toString(),
    hit: !1,
    lock: !1,
    promo: !1,
    upsell: !1,
    order_id: "",
    payment_link: "",
    order_data: {},
    params: new URLSearchParams(window.location.search).toString(),
    utm: ea()
};

function ea() {
    const e = new URL(window.location.href).searchParams.get("utm_source");
    return e || ($.source !== "" ? $.source : "")
}

function v() {
    const t = localStorage.getItem("session");
    return t === null ? null : JSON.parse(t)
}

function Bo() {
    const t = localStorage.getItem("session");
    if (t) return encodeURIComponent(btoa(t))
}

function ta(t) {
    const e = atob(decodeURIComponent(t));
    localStorage.setItem("session", e)
}

function oa() {
    const t = new URL(window.location.href);
    if (t.searchParams.has("sq") === !0) {
        ta(t.searchParams.get("sq")), t.searchParams.delete("sq"), window.history.replaceState({}, "", t.toString());
        return
    }
    const e = v();
    localStorage.getItem("session") === null ? localStorage.setItem("session", JSON.stringify(eo)) : e !== null && e.expire != null && e.expire < Date.now() && (ia(), localStorage.setItem("session", JSON.stringify(eo)))
}

function W(t) {
    const e = v();
    if (e !== null) {
        const o = Object.assign(e, t);
        localStorage.setItem("session", JSON.stringify(o))
    }
}

function ia() {
    localStorage.removeItem("session")
}

function _e() {
    const t = v();
    if (t) {
        const e = new URLSearchParams(t.params);
        return e.has("sq") === !0 && e.delete("sq"), e.toString()
    }
}

function V() {
    if (window.location.hostname === "preview.admad.io") return new URL("../", window.location.origin + "/" + window.location.pathname).href;
    if ($.cloakPath !== "") return window.location.origin + "/" + $.cloakPath + "/";
    const t = $.pathname !== "" ? `/${$.pathname}/` : "/";
    return window.location.origin + t
}

function ae(t, e, o) {
    const i = Ie(t, e, o);
    setTimeout(() => {
        window.location.href = i
    }, 500)
}

function Ie(t, e, o) {
    let i;
    if (window.location.hostname === "preview.admad.io") i = new URL(`${t}.html`, `${window.location.origin}${window.location.pathname}`);
    else if ($.cloakPath !== "") i = new URL(`${window.location.origin}/${$.cloakPath}/${$.pathname}/${t}.html`);
    else {
        const a = $.pathname !== "" ? `/${$.pathname}/` : "/";
        i = new URL(location.origin + a + t + ".html")
    }
    if (e || o) {
        if (e) {
            const a = _e();
            a && (i.search === "" ? i.search = "?" + a : i.search += "&" + a)
        }
        if (o) {
            const a = new URLSearchParams(i.search),
                r = Bo();
            r && (a.append("sq", r), i.search = a.toString())
        }
    }
    return i.toString()
}

function aa(t) {
    const e = new URL(t),
        o = _e();
    o && (e.search === "" ? e.search = "?" + o : e.search += "&" + o);
    const i = new URLSearchParams(e.search),
        a = Bo();
    return a && (i.append("sq", a), e.search = i.toString()), e.toString()
}

function na() {
    const t = location.origin + location.pathname;
    return !!($.pre && (V() + "news" === t || V() + "news.html" === t || V() + "index.html" === t || V() === t) || V() + "centrum" === t || V() + "centrum.html" === t || V() + "index.html" === t || V() === t)
}

function ra() {
    const t = location.origin + location.pathname;
    return V() + "thank-you" === t || V() + "thank-you.html" === t
}

function Jo() {
    const t = location.origin + location.pathname;
    return V() + "special" === t || V() + "special.html" === t
}
const sa = "application/json",
    qo = "Content-Type",
    ge = Symbol(),
    Zo = Symbol();

function to(t = {}) {
    var e;
    return (e = Object.entries(t).find(([o]) => o.toLowerCase() === qo.toLowerCase())) === null || e === void 0 ? void 0 : e[1]
}

function oo(t) {
    return /^application\/.*json.*/.test(t)
}
const le = function(t, e, o = !1) {
        return Object.entries(e).reduce((i, [a, r]) => {
            const s = t[a];
            return Array.isArray(s) && Array.isArray(r) ? i[a] = o ? [...s, ...r] : r : typeof s == "object" && typeof r == "object" ? i[a] = le(s, r, o) : i[a] = r, i
        }, { ...t
        })
    },
    be = {
        options: {},
        errorType: "text",
        polyfills: {},
        polyfill(t, e = !0, o = !1, ...i) {
            const a = this.polyfills[t] || (typeof self < "u" ? self[t] : null) || (typeof global < "u" ? global[t] : null);
            if (e && !a) throw new Error(t + " is not defined");
            return o && a ? new a(...i) : a
        }
    };

function ca(t, e = !1) {
    be.options = e ? t : le(be.options, t)
}

function la(t, e = !1) {
    be.polyfills = e ? t : le(be.polyfills, t)
}

function da(t) {
    be.errorType = t
}
const ua = t => e => t.reduceRight((o, i) => i(o), e) || e;
class Xo extends Error {}
const pa = t => {
        const e = Object.create(null);
        t = t._addons.reduce((g, _) => _.beforeRequest && _.beforeRequest(g, t._options, e) || g, t);
        const {
            _url: o,
            _options: i,
            _config: a,
            _catchers: r,
            _resolvers: s,
            _middlewares: l,
            _addons: d
        } = t, u = new Map(r), w = le(a.options, i);
        let p = o;
        const b = ua(l)((g, _) => (p = g, a.polyfill("fetch")(g, _)))(o, w),
            z = new Error,
            P = b.catch(g => {
                throw {
                    [ge]: g
                }
            }).then(g => {
                if (!g.ok) {
                    const _ = new Xo;
                    if (_.cause = z, _.stack = _.stack + `
CAUSE: ` + z.stack, _.response = g, _.url = p, g.type === "opaque") throw _;
                    return g.text().then(D => {
                        var O;
                        if (_.message = D, a.errorType === "json" || ((O = g.headers.get("Content-Type")) === null || O === void 0 ? void 0 : O.split(";")[0]) === "application/json") try {
                            _.json = JSON.parse(D)
                        } catch {}
                        throw _.text = D, _.status = g.status, _
                    })
                }
                return g
            }),
            M = g => g.catch(_ => {
                const D = _.hasOwnProperty(ge),
                    O = D ? _[ge] : _,
                    ct = (O == null ? void 0 : O.status) && u.get(O.status) || u.get(O == null ? void 0 : O.name) || D && u.has(ge) && u.get(ge);
                if (ct) return ct(O, t);
                const Ot = u.get(Zo);
                if (Ot) return Ot(O, t);
                throw O
            }),
            S = g => _ => M(g ? P.then(D => D && D[g]()).then(D => _ ? _(D) : D) : P.then(D => _ ? _(D) : D)),
            He = {
                _wretchReq: t,
                _fetchReq: b,
                _sharedState: e,
                res: S(null),
                json: S("json"),
                blob: S("blob"),
                formData: S("formData"),
                arrayBuffer: S("arrayBuffer"),
                text: S("text"),
                error(g, _) {
                    return u.set(g, _), this
                },
                badRequest(g) {
                    return this.error(400, g)
                },
                unauthorized(g) {
                    return this.error(401, g)
                },
                forbidden(g) {
                    return this.error(403, g)
                },
                notFound(g) {
                    return this.error(404, g)
                },
                timeout(g) {
                    return this.error(408, g)
                },
                internalError(g) {
                    return this.error(500, g)
                },
                fetchError(g) {
                    return this.error(ge, g)
                }
            },
            pi = d.reduce((g, _) => ({ ...g,
                ...typeof _.resolver == "function" ? _.resolver(g) : _.resolver
            }), He);
        return s.reduce((g, _) => _(g, t), pi)
    },
    ma = {
        _url: "",
        _options: {},
        _config: be,
        _catchers: new Map,
        _resolvers: [],
        _deferred: [],
        _middlewares: [],
        _addons: [],
        addon(t) {
            return { ...this,
                _addons: [...this._addons, t],
                ...t.wretch
            }
        },
        errorType(t) {
            return { ...this,
                _config: { ...this._config,
                    errorType: t
                }
            }
        },
        polyfills(t, e = !1) {
            return { ...this,
                _config: { ...this._config,
                    polyfills: e ? t : le(this._config.polyfills, t)
                }
            }
        },
        url(t, e = !1) {
            if (e) return { ...this,
                _url: t
            };
            const o = this._url.split("?");
            return { ...this,
                _url: o.length > 1 ? o[0] + t + "?" + o[1] : this._url + t
            }
        },
        options(t, e = !1) {
            return { ...this,
                _options: e ? t : le(this._options, t)
            }
        },
        headers(t) {
            const e = t ? Array.isArray(t) ? Object.fromEntries(t) : "entries" in t ? Object.fromEntries(t.entries()) : t : {};
            return { ...this,
                _options: le(this._options, {
                    headers: e
                })
            }
        },
        accept(t) {
            return this.headers({
                Accept: t
            })
        },
        content(t) {
            return this.headers({
                [qo]: t
            })
        },
        auth(t) {
            return this.headers({
                Authorization: t
            })
        },
        catcher(t, e) {
            const o = new Map(this._catchers);
            return o.set(t, e), { ...this,
                _catchers: o
            }
        },
        catcherFallback(t) {
            return this.catcher(Zo, t)
        },
        resolve(t, e = !1) {
            return { ...this,
                _resolvers: e ? [t] : [...this._resolvers, t]
            }
        },
        defer(t, e = !1) {
            return { ...this,
                _deferred: e ? [t] : [...this._deferred, t]
            }
        },
        middlewares(t, e = !1) {
            return { ...this,
                _middlewares: e ? t : [...this._middlewares, ...t]
            }
        },
        fetch(t = this._options.method, e = "", o = null) {
            let i = this.url(e).options({
                method: t
            });
            const a = to(i._options.headers),
                r = typeof o == "object" && (!i._options.headers || !a || oo(a));
            return i = o ? r ? i.json(o, a) : i.body(o) : i, pa(i._deferred.reduce((s, l) => l(s, s._url, s._options), i))
        },
        get(t = "") {
            return this.fetch("GET", t)
        },
        delete(t = "") {
            return this.fetch("DELETE", t)
        },
        put(t, e = "") {
            return this.fetch("PUT", e, t)
        },
        post(t, e = "") {
            return this.fetch("POST", e, t)
        },
        patch(t, e = "") {
            return this.fetch("PATCH", e, t)
        },
        head(t = "") {
            return this.fetch("HEAD", t)
        },
        opts(t = "") {
            return this.fetch("OPTIONS", t)
        },
        body(t) {
            return { ...this,
                _options: { ...this._options,
                    body: t
                }
            }
        },
        json(t, e) {
            const o = to(this._options.headers);
            return this.content(e || oo(o) && o || sa).body(JSON.stringify(t))
        }
    };

function pe(t = "", e = {}) {
    return { ...ma,
        _url: t,
        _options: e
    }
}
pe.default = pe;
pe.options = ca;
pe.errorType = da;
pe.polyfills = la;
pe.WretchError = Xo;

function ha() {
    if (window.location.hostname === "localhost" || window.location.hostname === "localhost.admad.io" || window.location.hostname === "preview.admad.io") return "https://api.nsbox.pl/api/v3/";
    const t = window.location.hostname.split(".");
    return `https://api.${t.length>2?t.slice(-2).join("."):window.location.hostname}/api/v3/`
}
const G = pe(ha(), {
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});
let We = !1;

function fa() {
    document.addEventListener("click", ya), wa(), ga()
}

function wa() {
    history.pushState({}, ""), window.onpopstate = () => {
        if (We) {
            We = !1;
            return
        }
        if (Yo(document.referrer)) return;
        window.onbeforeunload = null;
        const t = v();
        t === null || !t.lock ? (W({
            lock: !0
        }), ae("promo")) : window.history.go(-1)
    }
}

function ga() {
    window.onbeforeunload = () => {
        if (We) return We = !1, null;
        if (Yo(document.referrer)) return null;
        const t = v();
        return t === null || !t.lock ? (W({
            lock: !0
        }), ae("promo"), "You have unsaved changes!") : null
    }
}

function Yo(t) {
    return t === "" ? !1 : window.location.hostname === new URL(t).hostname
}

function ya(t) {
    t.target instanceof HTMLAnchorElement && (t.target.href.startsWith("#") || t.target.hash) && (We = !0)
}

function za() {
    ba()
}

function ba() {
    const t = v();
    if ((t == null ? void 0 : t.hit) === !1) {
        const o = {
            analytics_hit: {
                session_uuid: t == null ? void 0 : t.id,
                source_url: t == null ? void 0 : t.source,
                market_code: e($.market),
                user_agent: window.navigator.userAgent,
                offer_code: `${$.offerCode}1${e($.market)}`
            }
        };
        G.url("analytics_hits").post(o).json(), W({
            hit: !0
        })
    }

    function e(o) {
        return o === "de-AT" || o === "at" ? "AT" : o === "cs" || o === "cz" ? "CZ" : o === "et" || o === "ee" ? "EE" : o === "sl" || o === "si" ? "SI" : o === "nl-BE" || o === "fr-BE" || o === "be" ? "BE" : o.toUpperCase()
    }
}

function ka() {
    const t = document.createElement("script");
    t.src = "https://cdn.by.wonderpush.com/sdk/1.1/wonderpush-loader.min.js", t.async = !0, document.head.appendChild(t), window.WonderPush = window.WonderPush || [], window.WonderPush.push(["init", {
        webKey: va($.category),
        customDomain: _a()
    }])
}

function va(t) {
    return {
        beauty: "ed856e14e36688badb1394ad62964a42f6a7cd1d0c53493d03c3d7deef65b143",
        cardio: "303b71467dd9ca60b536662753704870b472427a551068dbd72744ac0e8722c5",
        eyelashes: "98ab988f608c7a4df4a1eb633948e0ddc318282b58a2933df11a5ef2f7d9a36c",
        feet: "838cd658ff0d4fd0c4a72d633fbc8d7bff868b9d34451b7f3964bc63ad018a45",
        hair: "4c065529617d1bcfb76bb5c35eb7e28c6e98d64d95619b136bc3d7031b5f0cd2",
        inne: "b5571efabcb038ae32a477a44324efc26f151f86d1aff2bfa8db27869556ac0d",
        joints: "31bf5ba7193ee9c733bf9a83eba29e4ca791da99ba783c865f34cfd27c87efe8",
        mycosis: "d597de0abacb10ad36b48ebb43fcb436dbc4550265f87f8dfdc0b26dec5472ee",
        oil: "1781ca101fcd3a6f4d5a5dee1aef2abb2a4354c349af0bda2c6148d600e29cec",
        potency: "8cae3c8eb3a4185535524c83d1560b32359d962ff990c4d86babe82ec104957f",
        slim: "ea1a360eb7ca0f4e15c2c09fc97f493b979b0dc9b270c671a8457cd962f18bbf",
        veins: "b3a8a676bfdaa2e7dfa9520e5b8e937a362e5bcb8d6db61cea2f82cf0c1b32f3",
        wrinkles: "9bf3e9e1749d3e2c1924c820cfdef7db0af8af0912a2681604536c34767ca374",
        lips: "5c58ec145c77ed0db082cca0261d93ce1b4457754cdc6e98f23acea611d649f3",
        nails: "8116e096cba3467d99810ce13d516426aeac4e7fe77b03692c021c3a40324e89"
    }[t]
}

function _a() {
    let t;
    return window.location.hostname === "preview.admad.io" ? (t = new URL("https://preview.admad.io/account06/_root/"), t) : $.cloakPath !== "" ? (t = new URL(`${window.location.origin}/${$.cloakPath}`), t) : (t = new URL(`${window.location.origin}`), t)
}

function ja() {
    let t = document.createElement("img");
    t.height = 1, t.width = 1, t.src = "https://wwc.addoor.net/px?trigger_id=2953", document.body.appendChild(t)
}

function $a() {
    let t = document.createElement("img");
    t.height = 1, t.width = 1, t.src = "https://wwc.addoor.net/px?trigger_id=2739", document.body.appendChild(t)
}

function Pa() {
    let t = document.createElement("img");
    t.height = 1, t.width = 1, t.src = "https://wwc.addoor.net/px?trigger_id=7251", document.body.appendChild(t)
}

function Ma() {
    let t = document.createElement("img");
    t.height = 1, t.width = 1, t.src = "https://wwc.addoor.net/px?trigger_id=7252", document.body.appendChild(t)
}

function Sa() {
    let t = document.createElement("script");
    t.type = "text/javascript", t.async = !0, t.src = "//s.retargeted.co/1/BG5Pwn.js", document.body.appendChild(t)
}

function xa() {
    const t = document.createElement("img");
    t.height = 1, t.width = 1, t.src = "https://ctrack.trafficjunky.net/ctrack?action=list&type=add&id=60&context=sale&cookiename=RTGT&maxcookiecount=10", document.body.appendChild(t);
    const e = document.createElement("script");
    e.type = "text/javascript", e.src = "https://a.exoclick.com/tag_gen.js", e.setAttribute("data-goal", "7ca15681eb989df70b26057e0e5275ec"), document.body.appendChild(e);
    const o = document.createElement("img");
    o.height = 1, o.width = 1, o.src = "//tsyndicate.com/api/v1/retargeting/set/cab97fba-0c21-43dc-bb4a-90ae3e894b93", document.body.appendChild(o)
}

function Aa() {
    (function(t, e, o, i, a) {
        var r, s, l;
        t[a] = t[a] || [], r = function() {
            var d = {
                ti: "97015606"
            };
            d.q = t[a], t[a] = new UET(d), t[a].push("pageLoad")
        }, s = e.createElement(o), s.src = i, s.async = 1, s.onload = s.onreadystatechange = function() {
            var d = this.readyState;
            d && d !== "loaded" && d !== "complete" || (r(), s.onload = s.onreadystatechange = null)
        }, l = e.getElementsByTagName(o)[0], l.parentNode.insertBefore(s, l)
    })(window, document, "script", "//bat.bing.com/bat.js", "uetq")
}

function Ta() {
    const t = document.createElement("script");
    t.type = "text/javascript", t.async = !0, t.src = "https://cdn2.midas-network.com/js/midas-pixel.min.js", document.body.appendChild(t)
}

function Wa() {
    (function() {
        if (window.midasPixel) midasPixel.setConversion();
        else var t = 0,
            e = setInterval(function() {
                if (window.midasPixel) return clearInterval(e), void midasPixel.setConversion();
                t > 100 && clearInterval(e), t++
            }, 50)
    })()
}

function Ca() {
    window._tfa = window._tfa || [], window._tfa.push({
            notify: "event",
            name: "page_view",
            id: 1305276
        }),
        function(t, e, o, i) {
            document.getElementById(i) || (t.async = 1, t.src = o, t.id = i, e.parentNode.insertBefore(t, e))
        }(document.createElement("script"), document.getElementsByTagName("script")[0], "//cdn.taboola.com/libtrc/unip/1305276/tfa.js", "tb_tfa_script")
}

function Ea() {
    _tfa.push({
        notify: "event",
        name: "lead",
        id: 1305276
    })
}

function Da() {
    const t = v();
    switch (t === null ? "" : t.utm) {
        case "projectagora_selfservice":
            Ca(), qe() && Ea();
            break;
        case "addoor":
            Je() && $a(), qe() && ja();
            break;
        case "addoor_selfservice":
        case "Addoor_selfservice":
            qe() && (Ra() ? Pa() : Ma());
            break;
        case "midas":
            (Oa() || Je()) && Ta(), qe() && Wa();
            break;
        case "admediago":
            Je() && xa();
            break;
        case "algo":
            Je() && Sa();
            break;
        case "BingAds":
        case "bingads":
            Aa();
            break
    }
}

function Ra() {
    const t = navigator.userAgent;
    return !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t) || /MacIntel/i.test(navigator.platform) && navigator.maxTouchPoints > 1 || window.innerWidth <= 800 && window.innerHeight <= 600)
}

function Oa() {
    return $.pre === !0
}

function Je() {
    return $.pre === !1 && !ra() && !Jo()
}

function qe() {
    return !!($.pre === !1 && Jo())
}
oa(), Da(), za(), ka(), na() && $.pre === !1 && $.lock === !0 && ($.flow === "upsell" || $.flow === "react") && fa();
const {
    getLocale: y,
    setLocale: La
} = Fi({
    sourceLocale: Ko,
    targetLocales: Ji,
    loadLocale: t => Ti(Object.assign({
        "../locales/cs.js": () => J(() =>
            import ("./cs-334220ba.js"), [],
            import.meta.url),
        "../locales/de-AT.js": () => J(() =>
            import ("./de-AT-6b33629a.js"), [],
            import.meta.url),
        "../locales/de.js": () => J(() =>
            import ("./de-31508529.js"), [],
            import.meta.url),
        "../locales/es.js": () => J(() =>
            import ("./es-f2929967.js"), [],
            import.meta.url),
        "../locales/et.js": () => J(() =>
            import ("./et-540a019d.js"), [],
            import.meta.url),
        "../locales/hr.js": () => J(() =>
            import ("./hr-f3c997ce.js"), [],
            import.meta.url),
        "../locales/hu.js": () => J(() =>
            import ("./hu-3a48fd93.js"), [],
            import.meta.url),
        "../locales/it.js": () => J(() =>
            import ("./it-a0f67c32.js"), [],
            import.meta.url),
        "../locales/ro.js": () => J(() =>
            import ("./ro-ca69c7af.js"), [],
            import.meta.url),
        "../locales/sk.js": () => J(() =>
            import ("./sk-df6b4aa5.js"), [],
            import.meta.url),
        "../locales/sl.js": () => J(() =>
            import ("./sl-12455b15.js"), [],
            import.meta.url)
    }), `../locales/${t}.js`)
}), io = async () => {
    const t = $.language || document.documentElement.lang || Ko;
    document.documentElement.lang === "" && (document.documentElement.lang = t), await La(t)
};

function Y(t) {
    return t === "de-AT" || t === "at" ? "AT" : t === "cs" || t === "cz" ? "CZ" : t === "et" || t === "ee" ? "EE" : t === "sl" || t === "si" ? "SI" : t.toUpperCase()
}

function jt(t) {
    switch (t) {
        case "cs":
            return "Jak na zdraví a krásu přírodně";
        case "es":
            return "Métodos naturales para la salud y la belleza";
        case "hr":
            return "Prirodni putevi do zdravlja i ljepote";
        case "hu":
            return "Természetes módszerek az egészségért és a szépségért";
        case "it":
            return "Metodi naturali per la salute e la bellezza";
        case "pl":
            return "Naturalne sposoby na zdrowie i urodę";
        case "sk":
            return "Prírodné metódy na podporu zdravia a krásy";
        default:
            return "Naturalne sposoby na zdrowie i urodę"
    }
}
var Go = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
class j extends ze {
    constructor() {
        super(), this._product = {
            name: "",
            size: 0,
            price: 0,
            sku: "",
            currency: "",
            unit: ""
        }, this._config = $, j._initialized === !1 && (j._initialized = !0, io(), this._getProduct())
    }
    async _getProduct() {
        await io(), G.url(`offers/${this._config.offerCode}1${Y(this._config.market)}`).get().json().then(e => {
            this._product = e, document.title === "" && (document.title = this._product.name)
        })
    }
}
j.styles = Si;
j._initialized = !1;
Go([E()], j.prototype, "_product", void 0);
Go([E()], j.prototype, "_config", void 0);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = {
        ATTRIBUTE: 1,
        CHILD: 2,
        PROPERTY: 3,
        BOOLEAN_ATTRIBUTE: 4,
        EVENT: 5,
        ELEMENT: 6
    },
    nt = t => (...e) => ({
        _$litDirective$: t,
        values: e
    });
let rt = class {
    constructor(e) {}
    get _$AU() {
        return this._$AM._$AU
    }
    _$AT(e, o, i) {
        this._$Ct = e, this._$AM = o, this._$Ci = i
    }
    _$AS(e, o) {
        return this.update(e, o)
    }
    update(e, o) {
        return this.render(...o)
    }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
    I: Ia
} = ji, Qo = t => t.strings === void 0, ao = () => document.createComment(""), $e = (t, e, o) => {
    var r;
    const i = t._$AA.parentNode,
        a = e === void 0 ? t._$AB : e._$AA;
    if (o === void 0) {
        const s = i.insertBefore(ao(), a),
            l = i.insertBefore(ao(), a);
        o = new Ia(s, l, t, t.options)
    } else {
        const s = o._$AB.nextSibling,
            l = o._$AM,
            d = l !== t;
        if (d) {
            let u;
            (r = o._$AQ) == null || r.call(o, t), o._$AM = t, o._$AP !== void 0 && (u = t._$AU) !== l._$AU && o._$AP(u)
        }
        if (s !== a || d) {
            let u = o._$AA;
            for (; u !== s;) {
                const w = u.nextSibling;
                i.insertBefore(u, a), u = w
            }
        }
    }
    return o
}, re = (t, e, o = t) => (t._$AI(e, o), t), Ua = {}, ei = (t, e = Ua) => t._$AH = e, Na = t => t._$AH, ft = t => {
    var i;
    (i = t._$AP) == null || i.call(t, !1, !0);
    let e = t._$AA;
    const o = t._$AB.nextSibling;
    for (; e !== o;) {
        const a = e.nextSibling;
        e.remove(), e = a
    }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = nt(class extends rt {
        constructor(t) {
            if (super(t), t.type !== X.PROPERTY && t.type !== X.ATTRIBUTE && t.type !== X.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
            if (!Qo(t)) throw Error("`live` bindings can only contain a single expression")
        }
        render(t) {
            return t
        }
        update(t, [e]) {
            if (e === F || e === m) return e;
            const o = t.element,
                i = t.name;
            if (t.type === X.PROPERTY) {
                if (e === o[i]) return F
            } else if (t.type === X.BOOLEAN_ATTRIBUTE) {
                if (!!e === o.hasAttribute(i)) return F
            } else if (t.type === X.ATTRIBUTE && o.getAttribute(i) === e + "") return F;
            return ei(t), e
        }
    }),
    Ct = L `
  ::placeholder {
    color: var(--adm-gray-600);
  }
  form {
    margin: 0 auto;
  }
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--adm-gray-700);
    margin-bottom: 0.25rem;
  }
  label a,
  p a {
    color: inherit;
  }
  input:not([type='radio']):not([type='checkbox']),
  select,
  textarea {
    display: block;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid var(--adm-gray-400);
    font-size: 0.875rem;
    line-height: 1.25rem;
    appearance: none;
    background-color: #fff;
    padding: 0.5rem 0.75rem;
  }
  textarea {
    min-height: 6rem;
  }
  input:not([type='radio']):not([type='checkbox']):focus {
    outline: 2px solid var(--adm-blue-500);
  }
  input:not([type='radio']):not([type='checkbox']):invalid,
  input:not([type='radio']):not([type='checkbox']).invalid {
    border-color: var(--adm-red-300);
    color: var(--adm-red-900);
  }
  input:not([type='radio']):not([type='checkbox']):invalid:focus,
  input:not([type='radio']):not([type='checkbox']).invalid:focus {
    outline-color: var(--adm-red-500);
  }
  input:not([type='radio']):not([type='checkbox']):invalid::placeholder,
  input:not([type='radio']):not([type='checkbox']).invalid::placeholder {
    color: var(--adm-red-500);
  }
  select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }
  select:focus {
    outline: none;
  }
  select:disabled {
    background-color: var(--adm-gray-100);
    cursor: not-allowed;
  }
  [type='radio'],
  [type='checkbox'] {
    width: 1rem;
    height: 1rem;
    appearance: none;
    padding: 0;
    color-adjust: exact;
    display: inline-block;
    background-origin: border-box;
    background-color: #ffffff;
    user-select: none;
    border: 1px solid var(--adm-gray-400);
    color: var(--adm-blue-500);
  }
  [type='radio'] {
    border-radius: 100%;
  }
  [type='checkbox'] {
    border-radius: 0.25rem;
  }
  [type='radio']:checked,
  [type='checkbox']:checked {
    border-color: transparent;
    background-color: currentColor;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  [type='checkbox']:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  }
  [type='radio']:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
  }
  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid transparent;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    color: #fff;
    background-color: var(--adm-green-600);
    -webkit-appearance: button;
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  button:hover {
    background-color: var(--adm-green-700);
  }
  button:focus {
    outline: 2px solid var(--adm-green-600);
    outline-offset: 2px;
  }
  button:disabled {
    background-color: var(--adm-gray-200);
    color: var(--adm-gray-500);
    outline-color: var(--adm-gray-200);
    cursor: not-allowed;
  }
  .form__edit p {
    font-size: 0.875rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .form__edit button {
    background-color: #4681f4;
    border-color: #4681f4;
    color: #ffffff;
    text-transform: uppercase;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
  }
  .form__edit button:hover {
    background-color: #3161bf;
    border-color: #3161bf;
    color: #ffffff;
  }
  .form__edit button > svg {
    stroke: #ffffff;
    margin-left: 0.5rem;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
  .form__grid {
    display: grid;
    row-gap: 1.5rem;
    column-gap: 1rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .form__item {
    grid-column: span 1 / span 1;
  }
  .form__group {
    position: relative;
    display: flex;
    align-items: center;
  }
  .form__group--start {
    align-items: flex-start;
  }
  .form__group ~ .form__group {
    margin-top: 1rem;
  }
  .form__group label {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  .form__checkbox {
    display: flex;
    align-items: center;
    height: 1.25;
  }
  .form__description {
    margin-left: 0.5rem;
  }
  .form__description label {
    margin-left: 0;
  }
  .form__description p {
    font-size: 0.75rem;
    color: var(--adm-gray-500);
    margin-top: 0.25rem;
  }
  .form__badge {
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--adm-green-800);
  }
  .form__badge span {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 0.125rem 0.625rem;
    background-color: var(--adm-green-100);
    margin-right: 0.5rem;
  }
  .form__badge svg {
    width: 0.75rem;
    height: 0.75rem;
  }
  .form__legend {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: var(--adm-gray-500);
  }
  .form__req {
    display: inline-block;
    margin-left: 0.25rem;
    color: var(--adm-red-600);
  }
  .form__info {
    display: inline-block;
    margin-left: 0.25rem;
    color: var(--adm-gray-500);
  }
  .form__alert {
    padding: 1rem;
    background-color: var(--adm-red-50);
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
  }
  .form__alert > div {
    display: flex;
  }
  .form__alert svg {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    color: var(--adm-red-400);
  }
  .form__alert p {
    margin-left: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--adm-red-800);
  }
  .form__error {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--adm-red-600);
  }
  @media (min-width: 768px) {
    .form__grid {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .form__item {
      grid-column: span 6 / span 6;
    }
    .form__item--half {
      grid-column: span 3 / span 3;
    }
    .form__item--third {
      grid-column: span 2 / span 2;
    }
    .form__legend {
      text-align: right;
    }
    .form__edit button {
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
    }
  }
`;
var N = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let R = class extends j {
    constructor() {
        super(...arguments), this.company = "", this.promo = !1, this.special = !0, this.edit = !1, this.online = !1, this.form = {
            phone: "",
            firstname: "",
            lastname: "",
            address: "",
            zip: "",
            city: "",
            country: "PL",
            email: "",
            payment_type: "cod",
            accept: "on",
            offer_code: "",
            session_uuid: "",
            source_url: "",
            payment_return_url: "",
            user_agent: ""
        }, this._networkError = !1, this._formError = !1, this._errors = {}
    }
    connectedCallback() {
        if (super.connectedCallback(), this.online && (this.form.payment_type = "online"), this._config.category === "potency" && this._config.language === "de" && (this.form.payment_type = "online"), this.edit) {
            const e = v();
            e && (this.form = { ...this.form,
                ...e == null ? void 0 : e.order_data
            })
        }
    }
    render() {
        const e = c `
      <div id="alert" class="form__alert">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
          <p>
            ${n("Wystąpił błąd, nie udało się złożyć zamówienia. Spróbuj ponownie później.")}
          </p>
        </div>
      </div>
    `,
            o = c `
      <div class="form__error">
        ${n("Wymagane jest wypełnienie tego pola.")}
      </div>
    `,
            i = c `
      <div class="form__error">${n("Pole jest błędnie wypełnione.")}</div>
    `,
            a = c `
      <div class="form__error">
        ${n("Wysyłka na ten kod pocztowy nie jest możliwa.")}
      </div>
    `;

        function r(u) {
            return u === "301" ? a : u === "105" ? i : o
        }
        const s = u => this._formError === !0 && u !== "" && u !== void 0 ? r(u) : m,
            l = c `
      <div class="form__item form__item--third">
        <label for="province_code"
          >Provincia<span class="form__req">*</span></label
        >
        <select
          name="province_code"
          id="province_code"
          @input=${this.changeValue}
          class=${this._errors.province_code!==void 0?"invalid":""}
        >
          <option value="">Provincia</option>
          <option value="AG">Agrigento - AG</option>
          <option value="AL">Alessandria - AL</option>
          <option value="AN">Ancona - AN</option>
          <option value="AO">Aosta - AO</option>
          <option value="AR">Arezzo - AR</option>
          <option value="AP">Ascoli Piceno - AP</option>
          <option value="AT">Asti - AT</option>
          <option value="AV">Avellino - AV</option>
          <option value="BA">Bari - BA</option>
          <option value="BT">Barletta-Andria-Trani - BT</option>
          <option value="BL">Belluno - BL</option>
          <option value="BN">Benevento or Beneventum - BN</option>
          <option value="BG">Bergamo - BG</option>
          <option value="BI">Biella - BI</option>
          <option value="BO">Bologna - BO</option>
          <option value="BZ">Bolzano/Bozen - BZ</option>
          <option value="BS">Brescia - BS</option>
          <option value="BR">Brindisi - BR</option>
          <option value="CA">Cagliari - CA</option>
          <option value="CL">Caltanissetta - CL</option>
          <option value="CB">Campobasso - CB</option>
          <option value="CI">Carbonia-Iglesias - CI</option>
          <option value="CE">Caserta - CE</option>
          <option value="CT">Catania - CT</option>
          <option value="CZ">Catanzaro - CZ</option>
          <option value="CH">Chieti - CH</option>
          <option value="CO">Como - CO</option>
          <option value="CS">Cosenza - CS</option>
          <option value="CR">Cremona - CR</option>
          <option value="KR">Crotone - KR</option>
          <option value="CN">Cuneo - CN</option>
          <option value="EN">Enna - EN</option>
          <option value="FM">Fermo - FM</option>
          <option value="FE">Ferrara - FE</option>
          <option value="FI">Firenze - FI</option>
          <option value="FG">Foggia - FG</option>
          <option value="FC">Forlì-Cesena - FC</option>
          <option value="FR">Frosinone - FR</option>
          <option value="GE">Genoa - GE</option>
          <option value="GO">Gorizia - GO</option>
          <option value="GR">Grosseto - GR</option>
          <option value="IM">Imperia - IM</option>
          <option value="IS">Isernia - IS</option>
          <option value="AQ">L'Aquila - AQ</option>
          <option value="SP">La Spezia - SP</option>
          <option value="LT">Latina - LT</option>
          <option value="LE">Lecce - LE</option>
          <option value="LC">Lecco - LC</option>
          <option value="LI">Livorno or Leghorn - LI</option>
          <option value="LO">Lodi - LO</option>
          <option value="LU">Lucca - LU</option>
          <option value="MC">Macerata - MC</option>
          <option value="MN">Mantua - MN</option>
          <option value="MS">Massa-Carrara - MS</option>
          <option value="MT">Matera - MT</option>
          <option value="VS">Medio Campidano - VS</option>
          <option value="ME">Messina - ME</option>
          <option value="MI">Milano - MI</option>
          <option value="MO">Modena - MO</option>
          <option value="MB">Monza and Brianza - MB</option>
          <option value="NA">Napoli - NA</option>
          <option value="NO">Novara - NO</option>
          <option value="NU">Nuoro - NU</option>
          <option value="OG">Ogliastra - OG</option>
          <option value="OT">Olbia-Tempio - OT</option>
          <option value="OR">Oristano - OR</option>
          <option value="PD">Padua - PD</option>
          <option value="PA">Palermo - PA</option>
          <option value="PR">Parma - PR</option>
          <option value="PV">Pavia - PV</option>
          <option value="PG">Perugia - PG</option>
          <option value="PU">Pesaro e Urbino - PU</option>
          <option value="PE">Pescara - PE</option>
          <option value="PC">Piacenza - PC</option>
          <option value="PI">Pisa - PI</option>
          <option value="PT">Pistoia - PT</option>
          <option value="PN">Pordenone - PN</option>
          <option value="PZ">Potenza - PZ</option>
          <option value="PO">Prato - PO</option>
          <option value="RG">Ragusa - RG</option>
          <option value="RA">Ravenna - RA</option>
          <option value="RC">Reggio Calabria - RC</option>
          <option value="RE">Reggio Emilia - RE</option>
          <option value="RSM">Republic of San Marino - RSM</option>
          <option value="RI">Rieti - RI</option>
          <option value="RN">Rimini - RN</option>
          <option value="RM">Roma - RM</option>
          <option value="RO">Rovigo - RO</option>
          <option value="SA">Salerno - SA</option>
          <option value="SS">Sassari - SS</option>
          <option value="SV">Savona - SV</option>
          <option value="SI">Siena - SI</option>
          <option value="SR">Siracusa - SR</option>
          <option value="SO">Sondrio - SO</option>
          <option value="SU">Sud Sardegna - SU</option>
          <option value="TA">Taranto - TA</option>
          <option value="TE">Teramo - TE</option>
          <option value="TR">Terni - TR</option>
          <option value="TP">Trapani - TP</option>
          <option value="TN">Trento - TN</option>
          <option value="TV">Treviso - TV</option>
          <option value="TS">Trieste - TS</option>
          <option value="TO">Turin - TO</option>
          <option value="UD">Udine - UD</option>
          <option value="VA">Varese - VA</option>
          <option value="SCV">Vatican City - SCV</option>
          <option value="VE">Venezia - VE</option>
          <option value="VB">Verbano-Cusio-Ossola - VB</option>
          <option value="VC">Vercelli - VC</option>
          <option value="VR">Verona - VR</option>
          <option value="VV">Vibo Valentia - VV</option>
          <option value="VI">Vicenza - VI</option>
          <option value="VT">Viterbo - VT</option>
        </select>
        ${s(this._errors.province_code)}
      </div>
    `,
            d = c `
      <div class="form__item form__item--third">
        <label for="province_code"
          >Judget<span class="form__req">*</span></label
        >
        <select
          name="province_code"
          id="province_code"
          @input=${this.changeValue}
          class=${this._errors.province_code!==void 0?"invalid":""}
        >
          <option value="">Judget</option>
          <option value="Alba">Alba</option>
          <option value="Arad">Arad</option>
          <option value="Argeș">Argeș</option>
          <option value="Bacău">Bacău</option>
          <option value="Bihor">Bihor</option>
          <option value="Bistriţa-Năsăud">Bistriţa-Năsăud</option>
          <option value="Botoşani">Botoşani</option>
          <option value="Braşov">Braşov</option>
          <option value="Brăila">Brăila</option>
          <option value="Bucureşti">Bucureşti</option>
          <option value="Buzău">Buzău</option>
          <option value="Caraş-Severin">Caraş-Severin</option>
          <option value="Cluj">Cluj</option>
          <option value="Constanţa">Constanţa</option>
          <option value="Covasna">Covasna</option>
          <option value="Călăraşi">Călăraşi</option>
          <option value="Dolj">Dolj</option>
          <option value="Dâmboviţa">Dâmboviţa</option>
          <option value="Galaţi">Galaţi</option>
          <option value="Giurgiu">Giurgiu</option>
          <option value="Gorj">Gorj</option>
          <option value="Harghita">Harghita</option>
          <option value="Hunedoara">Hunedoara</option>
          <option value="Ialomiţa">Ialomiţa</option>
          <option value="Iaşi">Iaşi</option>
          <option value="Ilfov">Ilfov</option>
          <option value="Maramureș">Maramureș</option>
          <option value="Mehedinţi">Mehedinţi</option>
          <option value="Mureș">Mureș</option>
          <option value="Neamţ">Neamţ</option>
          <option value="Olt">Olt</option>
          <option value="Prahova">Prahova</option>
          <option value="Satu Mare">Satu Mare</option>
          <option value="Sibiu">Sibiu</option>
          <option value="Suceava">Suceava</option>
          <option value="Sălaj">Sălaj</option>
          <option value="Teleorman">Teleorman</option>
          <option value="Timiş">Timiş</option>
          <option value="Tulcea">Tulcea</option>
          <option value="Vaslui">Vaslui</option>
          <option value="Vrancea">Vrancea</option>
          <option value="Vâlcea">Vâlcea</option>
        </select>
        ${s(this._errors.province_code)}
      </div>
    `;
        return c `
      ${this._config.hideVoucher!==!0&&this.promo!==!0&&(this._config.flow==="upsell"||this._config.flow==="standard")?c`<adm-voucher .product=${this._product.name}></adm-voucher>`:m}
      ${this._networkError?e:m}
      <form
        id="form"
        class="form"
        @submit="${this._handleSubmit}"
        @change=${this._handleChange}
      >
        <div class="form__grid">
          <div class="form__item">
            <label for="phone"
              >${n("Numer kontaktowy")}<span class="form__req">*</span
              ><span class="form__info"
                >&ndash;&nbsp;${n("niezbędny do realizacji zamówienia")}</span
              ></label
            >
            <input
              placeholder="${n("Np. 000000000")}"
              type="text"
              name="phone"
              id="phone"
              .value=${C(this.form.phone)}
              @input=${this.changeValue}
              class=${this._errors.phone!==void 0?"invalid":""}
            />
            ${s(this._errors.phone)}
          </div>

          <div class="form__item">
            <label for="email"
              >${n("Adres email")}<span class="form__req">*</span
              ><span class="form__info"
                >&ndash;&nbsp;${n("niezbędny do realizacji zamówienia")}</span
              ></label
            >
            <input
              placeholder="${n("Np. mail@gmail.com")}"
              type="text"
              name="email"
              id="email"
              .value=${C(this.form.email)}
              @input=${this.changeValue}
              class=${this._errors.email!==void 0?"invalid":""}
            />
            ${s(this._errors.email)}
          </div>

          <div class="form__item form__item--half">
            <label for="firstname"
              >${n("Imię")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. Jan")}"
              type="text"
              name="firstname"
              id="firstname"
              .value=${C(this.form.firstname)}
              @input=${this.changeValue}
              class=${this._errors.firstname!==void 0?"invalid":""}
            />
            ${s(this._errors.firstname)}
          </div>

          <div class="form__item form__item--half">
            <label for="lastname"
              >${n("Nazwisko")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. Kowalski")}"
              type="text"
              name="lastname"
              id="lastname"
              .value=${C(this.form.lastname)}
              @input=${this.changeValue}
              class=${this._errors.lastname!==void 0?"invalid":""}
            />
            ${s(this._errors.lastname)}
          </div>

          <div class="form__item">
            <label for="address"
              >${n("Ulica, nr domu")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. Przykładowa 1/11")}"
              type="text"
              name="address"
              id="address"
              .value=${C(this.form.address)}
              @input=${this.changeValue}
              class=${this._errors.address!==void 0?"invalid":""}
            />
            ${s(this._errors.address)}
          </div>

          ${y()==="it"?l:m}
          ${y()==="ro"?d:m}

          <div
            class="form__item ${y()==="it"||y()==="ro"?"form__item--third":"form__item--half"}"
          >
            <label for="zip"
              >${n("Kod pocztowy")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. 00-000")}"
              type="text"
              name="zip"
              id="zip"
              .value=${C(this.form.zip)}
              @input=${this.changeValue}
              class=${this._errors.zip!==void 0?"invalid":""}
            />
            ${s(this._errors.zip)}
          </div>

          <div
            class="form__item ${y()==="it"||y()==="ro"?"form__item--third":"form__item--half"}"
          >
            <label for="city"
              >${n("Miejscowość")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. Warszawa")}"
              type="text"
              name="city"
              id="city"
              .value=${C(this.form.city)}
              @input=${this.changeValue}
              class=${this._errors.city!==void 0?"invalid":""}
            />
            ${s(this._errors.city)}
          </div>

          <div class="form__item">
            <label for="country"
              >${n("Kraj doręczenia")}<span class="form__req">*</span></label
            >
            ${y()==="pl"?c` <select
                  name="country"
                  id="country"
                  .value=${C(this.form.country)}
                  @input=${this.changeValue}
                  class=${this._errors.country!==void 0?"invalid":""}
                >
                  <option value="AT">Austria</option>
                  <option value="BE">Belgia</option>
                  <option value="BG">Bułgaria</option>
                  <option value="HR">Chorwacja</option>
                  <option value="CY">Cypr</option>
                  <option value="CZ">Czechy</option>
                  <option value="DK">Dania</option>
                  <option value="EE">Estonia</option>
                  <option value="FI">Finlandia</option>
                  <option value="FR">Francja</option>
                  <option value="GR">Grecja</option>
                  <option value="ES">Hiszpania</option>
                  <option value="NL">Holandia</option>
                  <option value="IE">Irlandia</option>
                  <option value="IS">Islandia</option>
                  <option value="LT">Litwa</option>
                  <option value="LU">Luksemburg</option>
                  <option value="MT">Malta</option>
                  <option value="DE">Niemcy</option>
                  <option value="NO">Norwegia</option>
                  <option value="PL" selected>Polska</option>
                  <option value="PT">Portugalia</option>
                  <option value="RO">Rumunia</option>
                  <option value="CH">Szwajcaria</option>
                  <option value="SE">Szwecja</option>
                  <option value="SK">Słowacja</option>
                  <option value="SI">Słowenia</option>
                  <option value="HU">Węgry</option>
                  <option value="GB">Wielka Brytania</option>
                  <option value="IT">Włochy</option>
                  <option value="LV">Łotwa</option>
                </select>`:y()==="uk"?c` <select
                    name="country"
                    id="country"
                    .value=${C(this.form.country)}
                    @input=${this.changeValue}
                    class=${this._errors.country!==void 0?"invalid":""}
                  >
                    <option value="AT">Австрія</option>
                    <option value="BE">Бельгія</option>
                    <option value="BG">Болгарія</option>
                    <option value="HR">Хорватія</option>
                    <option value="CY">Кіпр</option>
                    <option value="CZ">Чехія</option>
                    <option value="DK">Данія</option>
                    <option value="EE">Естонія</option>
                    <option value="FI">Фінляндія</option>
                    <option value="FR">Франція</option>
                    <option value="GR">Греція</option>
                    <option value="ES">Іспанія</option>
                    <option value="NL">Нідерланди</option>
                    <option value="IE">Ірландія</option>
                    <option value="IS">Ісландія</option>
                    <option value="LT">Литва</option>
                    <option value="LU">Люксембург</option>
                    <option value="MT">Мальта</option>
                    <option value="DE">Німеччина</option>
                    <option value="NO">Норвегія</option>
                    <option value="PL" selected>Польща</option>
                    <option value="PT">Португалія</option>
                    <option value="RO">Румунія</option>
                    <option value="CH">Швейцарія</option>
                    <option value="SE">Швеція</option>
                    <option value="SK">Словаччина</option>
                    <option value="SI">Словенія</option>
                    <option value="HU">Угорщина</option>
                    <option value="GB">Велика Британія</option>
                    <option value="IT">Італія</option>
                    <option value="LV">Латвія</option>
                  </select>`:y()==="hr"&&this._config.market==="de"?c` <select
                      name="country"
                      id="country"
                      @input=${this.changeValue}
                      class=${this._errors.country!==void 0?"invalid":""}
                      disabled
                    >
                      <option
                        .value=${Y(this._config.market)}
                        selected
                      >
                        Njemačka
                      </option>
                    </select>`:y()==="hr"&&this._config.market==="de-AT"?c` <select
                        name="country"
                        id="country"
                        @input=${this.changeValue}
                        class=${this._errors.country!==void 0?"invalid":""}
                        disabled
                      >
                        <option
                          .value=${Y(this._config.market)}
                          selected
                        >
                          Austrija
                        </option>
                      </select>`:c`
                        <select
                          name="country"
                          id="country"
                          @input=${this.changeValue}
                          class=${this._errors.country!==void 0?"invalid":""}
                          disabled
                        >
                          <option
                            .value=${Y(y())}
                            selected
                          >
                            ${n("Polska")}
                          </option>
                        </select>
                      `}
            ${s(this._errors.country)}
          </div>

          ${this.edit?m:c`
                ${this._config.category==="potency"&&this._config.language==="de"?c`
                      <div class="form__item">
                        <div class="form__group">
                          <input
                            type="radio"
                            value="online"
                            name="payment_type"
                            id="payment_type_online"
                            ?checked=${this.form.payment_type==="online"}
                            @change=${this.changePayment}
                          />
                          <label for="payment_type_online">
                            ${n("Płatność z góry - przelew elektroniczny (przedpłata)")}
                          </label>
                        </div>
                        ${this.online?m:c`
                              <div class="form__group">
                                <input
                                  type="radio"
                                  value="cod"
                                  name="payment_type"
                                  id="payment_type_cod"
                                  ?checked=${this.form.payment_type==="cod"}
                                  @change=${this.changePayment}
                                />
                                <label for="payment_type_cod">
                                  ${n("Płatność przy odbiorze u kuriera (pobranie)")}
                                </label>
                              </div>
                            `}
                      </div>
                    `:c`
                      <div class="form__item">
                        ${this.online?m:c`
                              <div class="form__group">
                                <input
                                  type="radio"
                                  value="cod"
                                  name="payment_type"
                                  id="payment_type_cod"
                                  ?checked=${this.form.payment_type==="cod"}
                                  @change=${this.changePayment}
                                />
                                <label for="payment_type_cod">
                                  ${n("Płatność przy odbiorze u kuriera (pobranie)")}
                                </label>
                              </div>
                            `}
                        <div class="form__group">
                          <input
                            type="radio"
                            value="online"
                            name="payment_type"
                            id="payment_type_online"
                            ?checked=${this.form.payment_type==="online"}
                            @change=${this.changePayment}
                          />
                          <label for="payment_type_online">
                            ${n("Płatność z góry - przelew elektroniczny (przedpłata)")}
                          </label>
                        </div>
                      </div>
                    `}
              `}
          ${this.edit?m:c`
                <div class="form__item">
                  <div class="form__group form__group--start">
                    <div class="form__checkbox">
                      <input
                        type="checkbox"
                        name="accept"
                        id="accept"
                        ?checked=${this.form.accept==="on"}
                        @change=${this.changeRegulations}
                        required
                      />
                    </div>
                    <div class="form__description">
                      <label for="accept">
                        ${n(c`Zapoznałem się i akceptuję <a href="regulations.html" target="_blank">Regulamin</a> i <a href="privacy-policy.html" target="_blank">Politykę Prywatności</a>.`)}
                      </label>
                      <p>
                        ${n(c`Administratorem Twoich danych osobowych jest ${this.company?this.company:"NIKSMAT SOLUTIONS S.R.O."}. Dane przetwarzane są na potrzeby złożenia i realizacji zamówienia oraz w celach pomocniczych. Szczegóły: <a href="privacy-policy.html" target="_blank">Polityka Prywatności</a>.`)}
                      </p>
                    </div>
                  </div>
                </div>
              `}
          ${this.edit?c`
                <div class="form__item form__edit">
                  <p>
                    ${n(c`Twoja przesyłka zostanie objęta <strong>pierwszeństwem wysyłki</strong>.`)}
                  </p>
                  <button id="submit" type="submit">
                    <span>${n("Potwierdzam dane")}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.5 12H20.33"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              `:c`
                <div class="form__item">
                  <button id="submit" type="submit">${n("Zamawiam")}</button>
                </div>
              `}
          ${this.edit?m:c`
                <div class="form__item form__item--half">
                  <p class="form__badge">
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      SSL
                    </span>
                    ${n("Twoje dane są w 100% bezpieczne")}
                  </p>
                </div>
                <div class="form__item form__item--half">
                  <div class="form__legend">
                    <span class="form__req">*</span> - ${n("pola wymagane")}
                  </div>
                </div>
              `}
        </div>
      </form>
    `
    }
    changeValue(e) {
        const o = e.target;
        this.form[o.name] = o.value
    }
    changePayment(e) {
        const o = e.target;
        this.form.payment_type = o.value
    }
    changeRegulations(e) {
        e.target.checked ? this.form.accept = "on" : this.form.accept = "off"
    }
    _buildOrder() {
        var e;
        let o = {};
        return this._config.market !== "pl" && (this.form.country = Y(this._config.market)), this.edit ? o = { ...this._extractOrderData(this.form),
            typconf2: "true"
        } : o = { ...this.form,
            offer_code: `${this._config.offerCode}${this.promo||this._config.flow==="or"?"3":"1"}${Y(this._config.market)}`,
            session_uuid: (e = v()) === null || e === void 0 ? void 0 : e.id,
            source_url: this._getSourceUrl(),
            payment_return_url: this._getThankYouPage(),
            user_agent: window.navigator.userAgent
        }, o
    }
    _handleSubmit(e) {
        if (e.preventDefault(), this._config.offerCode !== "") {
            this._submit.disabled = !0, this._resetForm();
            const o = this._buildOrder();
            this._config.confirm && W({
                order_data: this._extractOrderData(o)
            }), this._sendOrder(o)
        } else if (this.edit) {
            this._submit.disabled = !0, this._resetForm();
            const o = this._buildOrder();
            this._sendOrder(o)
        } else window.location.assign(this._getThankYouPage())
    }
    _sendOrder(e) {
        let o;
        if (this.edit) {
            const i = v(),
                a = i == null ? void 0 : i.order_id;
            o = G.url(`orders/${a}`).put({
                order: e
            })
        } else o = G.url("orders").post({
            order: e
        });
        o.json().then(i => {
            var a;
            if (W({
                    lock: !0
                }), this.promo && W({
                    promo: !0
                }), this.edit === !1 && (this._config.flow === "upsell" || this._config.flow === "react" || this._config.flow === "or")) return W({
                order_id: i.order.uuid
            }), i.payment_link && W({
                payment_link: i.payment_link
            }), ae("special", !0), i;
            if (this.edit) {
                const r = (a = v()) === null || a === void 0 ? void 0 : a.payment_link;
                return r && r !== "" ? (window.location.assign(r), i) : (window.location.assign(this._getThankYouPage()), i)
            }
            return this.edit === !1 && (this._config.flow === "insert" || this._config.flow === "xsell") && this._config.confirm ? (W({
                order_id: i.order.uuid
            }), i.payment_link && W({
                payment_link: i.payment_link
            }), ae("confirmation", !0), i) : i.payment_link ? (window.location.assign(i.payment_link), i) : (window.location.assign(this._getThankYouPage()), i)
        }).catch(i => {
            if (i.status === 422) {
                const a = i.json.errors;
                for (const [r, s] of Object.entries(a)) {
                    const l = s[0];
                    this._errors[r] = l
                }
                this._formError = !0, this._submit.disabled = !1, this.scrollToFirstError(a);
                return
            } else this._networkError = !0, this._submit.disabled = !1
        })
    }
    _extractOrderData(e) {
        return {
            phone: e.phone,
            firstname: e.firstname,
            lastname: e.lastname,
            address: e.address,
            zip: e.zip,
            city: e.city,
            country: e.country,
            email: e.email,
            province_code: e.province_code
        }
    }
    scrollToFirstError(e) {
        const o = this._form;
        if (o) {
            const i = Object.keys(e);
            for (const a of i) {
                const r = o.querySelector(`[name="${a}"]`);
                if (r) {
                    window.scrollTo({
                        behavior: "smooth",
                        top: r.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 24
                    });
                    break
                }
            }
        }
    }
    _resetForm() {
        this._networkError = !1, this._formError = !1, this._errors = {}
    }
    _handleChange() {
        if (this._config.offerCode !== "" && !this.edit) {
            const e = /\d{9}/;
            if (this._phone.value.match(e)) {
                const o = this._buildOrder();
                G.url("drafts").post({
                    order: o
                }).res()
            }
        }
    }
    _getSourceUrl() {
        var e;
        const o = v(),
            i = (e = o == null ? void 0 : o.source) !== null && e !== void 0 ? e : "",
            a = new URL(i);
        if (this._config.flow === "insert" && (a.searchParams.set("utm_channel", "INSERT"), a.searchParams.set("utm_type", "HOT"), a.searchParams.set("utm_action", "REAKTYWACJA")), this._config.flow === "xsell" && (a.searchParams.set("utm_channel", "INSERT"), a.searchParams.set("utm_type", "HOT"), a.searchParams.set("utm_action", "XSELL")), this._config.content !== "" && a.searchParams.get("utm_content") === null && a.searchParams.set("utm_content", this._config.content), a.searchParams.get("utm_source")) return a.toString();
        if (o != null && o.utm && (o == null ? void 0 : o.utm) !== "" && i) {
            const s = new URL(a.toString());
            return s.searchParams.set("utm_source", o == null ? void 0 : o.utm), s.toString()
        }
        return a.toString()
    }
    _getThankYouPage() {
        if (this._config.typ !== "") {
            const e = new URL(this._config.typ),
                o = _e();
            return o ? (e.search === "" ? e.search = "?" + o : e.search += "&" + o, e.toString()) : this._config.typ
        }
        return Ie("thank-you")
    }
};
R.styles = [j.styles, Ct];
N([A({
    type: String
})], R.prototype, "company", void 0);
N([A({
    type: Boolean
})], R.prototype, "promo", void 0);
N([A({
    type: Boolean
})], R.prototype, "special", void 0);
N([A({
    type: Boolean
})], R.prototype, "edit", void 0);
N([A({
    type: Boolean
})], R.prototype, "online", void 0);
N([A({
    type: Object,
    attribute: !1
})], R.prototype, "form", void 0);
N([E()], R.prototype, "_networkError", void 0);
N([E()], R.prototype, "_formError", void 0);
N([E()], R.prototype, "_errors", void 0);
N([U("#form")], R.prototype, "_form", void 0);
N([U("#submit")], R.prototype, "_submit", void 0);
N([U("#phone")], R.prototype, "_phone", void 0);
R = N([I("adm-form"), q()], R);
var Q = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let K = class extends j {
    constructor() {
        super(...arguments), this.form = {
            phone: "",
            firstname: "",
            lastname: "",
            accept: "off",
            country: "PL",
            offer_code: "",
            session_uuid: "",
            source_url: "",
            payment_return_url: "",
            user_agent: ""
        }, this.company = "", this.promo = !1, this._networkError = !1, this._formError = !1, this._errors = {}
    }
    render() {
        const e = c `
      <div id="alert" class="form__alert">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
          <p>
            ${n("Wystąpił błąd, nie udało się złożyć zamówienia. Spróbuj ponownie później.")}
          </p>
        </div>
      </div>
    `,
            o = c `
      <div class="form__error">
        ${n("Wymagane jest wypełnienie tego pola.")}
      </div>
    `,
            i = c `
      <div class="form__error">${n("Pole jest błędnie wypełnione.")}</div>
    `,
            a = c `
      <div class="form__error">
        ${n("Wysyłka na ten kod pocztowy nie jest możliwa.")}
      </div>
    `;

        function r(l) {
            return l === "301" ? a : l === "105" ? i : o
        }
        const s = l => this._formError === !0 && l !== "" && l !== void 0 ? r(l) : m;
        return c `
      ${this._networkError?e:m}
      <form
        id="form"
        class="form"
        @submit="${this._handleSubmit}"
        @change=${this._handleChange}
      >
        <div class="form__grid">
          <div class="form__item">
            <label for="phone"
              >${n("Numer kontaktowy")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. 000000000")}"
              type="text"
              name="phone"
              id="phone"
              .value=${C(this.form.phone)}
              @input=${this.changeValue}
              class=${this._errors.phone!==void 0?"invalid":""}
            />
            ${s(this._errors.phone)}
          </div>

          <div class="form__item form__item--half">
            <label for="firstname"
              >${n("Imię")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. Jan")}"
              type="text"
              name="firstname"
              id="firstname"
              .value=${C(this.form.firstname)}
              @input=${this.changeValue}
              class=${this._errors.firstname!==void 0?"invalid":""}
            />
            ${s(this._errors.firstname)}
          </div>

          <div class="form__item form__item--half">
            <label for="lastname"
              >${n("Nazwisko")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Np. Kowalski")}"
              type="text"
              name="lastname"
              id="lastname"
              .value=${C(this.form.lastname)}
              @input=${this.changeValue}
              class=${this._errors.lastname!==void 0?"invalid":""}
            />
            ${s(this._errors.lastname)}
          </div>

          <div class="form__item">
            <div class="form__group form__group--start">
              <div class="form__checkbox">
                <input
                  type="checkbox"
                  name="accept"
                  id="accept"
                  ?checked=${this.form.accept==="on"}
                  @change=${this.changeRegulations}
                  required
                />
              </div>
              <div class="form__description">
                <label for="accept">
                  ${n(c`Zapoznałem się i akceptuję <a href="regulations.html" target="_blank">Regulamin</a> i <a href="privacy-policy.html" target="_blank">Politykę Prywatności</a>.`)}
                </label>
                <p>
                  ${n(c`Administratorem Twoich danych osobowych jest ${this.company?this.company:"NIKSMAT SOLUTIONS S.R.O."}. Dane przetwarzane są na potrzeby złożenia i realizacji zamówienia oraz w celach pomocniczych. Szczegóły: <a href="privacy-policy.html" target="_blank">Polityka Prywatności</a>.`)}
                </p>
              </div>
            </div>
          </div>

          <div class="form__item">
            <button id="submit" type="submit">${n("Zamawiam")}</button>
          </div>
        </div>
      </form>
    `
    }
    changeValue(e) {
        const o = e.target;
        this.form[o.name] = o.value
    }
    _buildOrder() {
        var e;
        let o = {};
        return this._config.market !== "pl" && (this.form.country = Y(this._config.market)), o = { ...this.form,
            offer_code: `${this._config.offerCode}${this.promo||this._config.flow==="or"?"3":"1"}${Y(this._config.market)}`,
            session_uuid: (e = v()) === null || e === void 0 ? void 0 : e.id,
            source_url: this._getSourceUrl(),
            payment_return_url: this._getThankYouPage(),
            user_agent: window.navigator.userAgent
        }, o
    }
    _handleSubmit(e) {
        if (e.preventDefault(), this._config.offerCode !== "") {
            this._submit.disabled = !0, this._resetForm();
            const o = this._buildOrder();
            this._sendOrder(o)
        } else window.location.assign(this._getThankYouPage())
    }
    _sendOrder(e) {
        G.url("short_orders").post({
            order: e
        }).json().then(i => (W({
            lock: !0
        }), this.promo && W({
            promo: !0
        }), this._config.flow === "upsell" || this._config.flow === "react" || this._config.flow === "or" ? (W({
            order_id: i.order.uuid
        }), i.payment_link && W({
            payment_link: i.payment_link
        }), ae("special", !0), i) : i.payment_link ? (window.location.assign(i.payment_link), i) : (window.location.assign(this._getThankYouPage()), i))).catch(i => {
            if (i.status === 422) {
                const a = i.json.errors;
                for (const [r, s] of Object.entries(a)) {
                    const l = s[0];
                    this._errors[r] = l
                }
                this._formError = !0, this._submit.disabled = !1;
                return
            } else this._networkError = !0, this._submit.disabled = !1
        })
    }
    _resetForm() {
        this._networkError = !1, this._formError = !1, this._errors = {}
    }
    _handleChange() {
        if (this._config.offerCode !== "") {
            const e = /\d{9}/;
            if (this._phone.value.match(e)) {
                const o = this._buildOrder();
                G.url("drafts").post({
                    order: o
                }).res()
            }
        }
    }
    changeRegulations(e) {
        e.target.checked ? this.form.accept = "on" : this.form.accept = "off"
    }
    _getSourceUrl() {
        var e;
        const o = v(),
            i = (e = o == null ? void 0 : o.source) !== null && e !== void 0 ? e : "",
            a = new URL(i);
        if (this._config.flow === "insert" && (a.searchParams.set("utm_channel", "INSERT"), a.searchParams.set("utm_type", "HOT"), a.searchParams.set("utm_action", "REAKTYWACJA")), this._config.flow === "xsell" && (a.searchParams.set("utm_channel", "INSERT"), a.searchParams.set("utm_type", "HOT"), a.searchParams.set("utm_action", "XSELL")), this._config.content !== "" && a.searchParams.get("utm_content") === null && a.searchParams.set("utm_content", this._config.content), a.searchParams.get("utm_source")) return a.toString();
        if (o != null && o.utm && (o == null ? void 0 : o.utm) !== "" && i) {
            const s = new URL(a.toString());
            return s.searchParams.set("utm_source", o == null ? void 0 : o.utm), s.toString()
        }
        return a.toString()
    }
    _getThankYouPage() {
        if (this._config.typ !== "") {
            const e = new URL(this._config.typ),
                o = _e();
            return o ? (e.search === "" ? e.search = "?" + o : e.search += "&" + o, e.toString()) : this._config.typ
        }
        return Ie("thank-you")
    }
};
K.styles = [j.styles, Ct];
Q([A({
    type: Object,
    attribute: !1
})], K.prototype, "form", void 0);
Q([A({
    type: String
})], K.prototype, "company", void 0);
Q([A({
    type: Boolean
})], K.prototype, "promo", void 0);
Q([E()], K.prototype, "_networkError", void 0);
Q([E()], K.prototype, "_formError", void 0);
Q([E()], K.prototype, "_errors", void 0);
Q([U("#form")], K.prototype, "_form", void 0);
Q([U("#submit")], K.prototype, "_submit", void 0);
Q([U("#phone")], K.prototype, "_phone", void 0);
K = Q([I("adm-short-form"), q()], K);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ti = nt(class extends rt {
    constructor(t) {
        var e;
        if (super(t), t.type !== X.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")
    }
    render(t) {
        return " " + Object.keys(t).filter(e => t[e]).join(" ") + " "
    }
    update(t, [e]) {
        var i, a;
        if (this.st === void 0) {
            this.st = new Set, t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter(r => r !== "")));
            for (const r in e) e[r] && !((i = this.nt) != null && i.has(r)) && this.st.add(r);
            return this.render(e)
        }
        const o = t.element.classList;
        for (const r of this.st) r in e || (o.remove(r), this.st.delete(r));
        for (const r in e) {
            const s = !!e[r];
            s === this.st.has(r) || (a = this.nt) != null && a.has(r) || (s ? (o.add(r), this.st.add(r)) : (o.remove(r), this.st.delete(r)))
        }
        return F
    }
});

function H(t, e, o) {
    let i;
    const a = o ? `${o}-${e}` : e;
    return window.location.hostname === "preview.admad.io" ? (i = new URL(`${t}/${a}`, `${window.location.origin}/account06/_root/main-assets/`), i) : $.cloakPath !== "" ? (i = new URL(`${t}/${a}`, `${window.location.origin}/${$.cloakPath}/main-assets/`), i) : (i = new URL(`${t}/${a}`, `${window.location.origin}/main-assets/`), i)
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = (t, e) => {
        var i;
        const o = t._$AN;
        if (o === void 0) return !1;
        for (const a of o)(i = a._$AO) == null || i.call(a, e, !1), Se(a, e);
        return !0
    },
    et = t => {
        let e, o;
        do {
            if ((e = t._$AM) === void 0) break;
            o = e._$AN, o.delete(t), t = e
        } while ((o == null ? void 0 : o.size) === 0)
    },
    oi = t => {
        for (let e; e = t._$AM; t = e) {
            let o = e._$AN;
            if (o === void 0) e._$AN = o = new Set;
            else if (o.has(t)) break;
            o.add(t), Ha(e)
        }
    };

function Va(t) {
    this._$AN !== void 0 ? (et(this), this._$AM = t, oi(this)) : this._$AM = t
}

function Fa(t, e = !1, o = 0) {
    const i = this._$AH,
        a = this._$AN;
    if (a !== void 0 && a.size !== 0)
        if (e)
            if (Array.isArray(i))
                for (let r = o; r < i.length; r++) Se(i[r], !1), et(i[r]);
            else i != null && (Se(i, !1), et(i));
    else Se(this, t)
}
const Ha = t => {
    t.type == X.CHILD && (t._$AP ? ? (t._$AP = Fa), t._$AQ ? ? (t._$AQ = Va))
};
let Ka = class extends rt {
    constructor() {
        super(...arguments), this._$AN = void 0
    }
    _$AT(e, o, i) {
        super._$AT(e, o, i), oi(this), this.isConnected = e._$AU
    }
    _$AO(e, o = !0) {
        var i, a;
        e !== this.isConnected && (this.isConnected = e, e ? (i = this.reconnected) == null || i.call(this) : (a = this.disconnected) == null || a.call(this)), o && (Se(this, e), et(this))
    }
    setValue(e) {
        if (Qo(this._$Ct)) this._$Ct._$AI(e, this);
        else {
            const o = [...this._$Ct._$AH];
            o[this._$Ci] = e, this._$Ct._$AI(o, this, 0)
        }
    }
    disconnected() {}
    reconnected() {}
};
const Ba = new WeakMap;
let no = 0;
const wt = new Map,
    ro = new WeakSet,
    so = () => new Promise(t => requestAnimationFrame(t)),
    Ce = [{
        opacity: 0
    }],
    Ee = [{
        opacity: 0
    }, {
        opacity: 1
    }],
    co = (t, e) => {
        const o = t - e;
        return o === 0 ? void 0 : o
    },
    lo = (t, e) => {
        const o = t / e;
        return o === 1 ? void 0 : o
    },
    gt = {
        left: (t, e) => {
            const o = co(t, e);
            return {
                value: o,
                transform: o == null || isNaN(o) ? void 0 : `translateX(${o}px)`
            }
        },
        top: (t, e) => {
            const o = co(t, e);
            return {
                value: o,
                transform: o == null || isNaN(o) ? void 0 : `translateY(${o}px)`
            }
        },
        width: (t, e) => {
            let o;
            e === 0 && (e = 1, o = {
                width: "1px"
            });
            const i = lo(t, e);
            return {
                value: i,
                overrideFrom: o,
                transform: i == null || isNaN(i) ? void 0 : `scaleX(${i})`
            }
        },
        height: (t, e) => {
            let o;
            e === 0 && (e = 1, o = {
                height: "1px"
            });
            const i = lo(t, e);
            return {
                value: i,
                overrideFrom: o,
                transform: i == null || isNaN(i) ? void 0 : `scaleY(${i})`
            }
        }
    },
    Ja = {
        duration: 333,
        easing: "ease-in-out"
    },
    qa = ["left", "top", "width", "height", "opacity", "color", "background"],
    uo = new WeakMap;
class Za extends Ka {
    constructor(e) {
        if (super(e), this.t = !1, this.i = null, this.o = null, this.h = !0, this.shouldLog = !1, e.type === X.CHILD) throw Error("The `animate` directive must be used in attribute position.");
        this.createFinished()
    }
    createFinished() {
        var e;
        (e = this.resolveFinished) == null || e.call(this), this.finished = new Promise(o => {
            this.l = o
        })
    }
    async resolveFinished() {
        var e;
        (e = this.l) == null || e.call(this), this.l = void 0
    }
    render(e) {
        return m
    }
    getController() {
        return Ba.get(this.u)
    }
    isDisabled() {
        var e;
        return this.options.disabled || ((e = this.getController()) == null ? void 0 : e.disabled)
    }
    update(e, [o]) {
        var a;
        const i = this.u === void 0;
        return i && (this.u = (a = e.options) == null ? void 0 : a.host, this.u.addController(this), this.u.updateComplete.then(r => this.t = !0), this.element = e.element, uo.set(this.element, this)), this.optionsOrCallback = o, (i || typeof o != "function") && this.p(o), this.render(o)
    }
    p(e) {
        e = e ? ? {};
        const o = this.getController();
        o !== void 0 && ((e = { ...o.defaultOptions,
            ...e
        }).keyframeOptions = { ...o.defaultOptions.keyframeOptions,
            ...e.keyframeOptions
        }), e.properties ? ? (e.properties = qa), this.options = e
    }
    m() {
        const e = {},
            o = this.element.getBoundingClientRect(),
            i = getComputedStyle(this.element);
        return this.options.properties.forEach(a => {
            const r = o[a] ? ? (gt[a] ? void 0 : i[a]),
                s = Number(r);
            e[a] = isNaN(s) ? r + "" : s
        }), e
    }
    v() {
        let e, o = !0;
        return this.options.guard && (e = this.options.guard(), o = ((i, a) => {
            if (Array.isArray(i)) {
                if (Array.isArray(a) && a.length === i.length && i.every((r, s) => r === a[s])) return !1
            } else if (a === i) return !1;
            return !0
        })(e, this._)), this.h = this.t && !this.isDisabled() && !this.isAnimating() && o && this.element.isConnected, this.h && (this._ = Array.isArray(e) ? Array.from(e) : e), this.h
    }
    hostUpdate() {
        typeof this.optionsOrCallback == "function" && this.p(this.optionsOrCallback()), this.v() && (this.A = this.m(), this.i = this.i ? ? this.element.parentNode, this.o = this.element.nextSibling)
    }
    async hostUpdated() {
        if (!this.h || !this.element.isConnected || this.options.skipInitial && !this.isHostRendered) return;
        let e;
        this.prepare(), await so;
        const o = this.O(),
            i = this.j(this.options.keyframeOptions, o),
            a = this.m();
        if (this.A !== void 0) {
            const {
                from: r,
                to: s
            } = this.N(this.A, a, o);
            this.log("measured", [this.A, a, r, s]), e = this.calculateKeyframes(r, s)
        } else {
            const r = wt.get(this.options.inId);
            if (r) {
                wt.delete(this.options.inId);
                const {
                    from: s,
                    to: l
                } = this.N(r, a, o);
                e = this.calculateKeyframes(s, l), e = this.options.in ? [{ ...this.options.in[0],
                    ...e[0]
                }, ...this.options.in.slice(1), e[1]] : e, no++, e.forEach(d => d.zIndex = no)
            } else this.options.in && (e = [...this.options.in, {}])
        }
        this.animate(e, i)
    }
    resetStyles() {
        this.P !== void 0 && (this.element.setAttribute("style", this.P ? ? ""), this.P = void 0)
    }
    commitStyles() {
        var e, o;
        this.P = this.element.getAttribute("style"), (e = this.webAnimation) == null || e.commitStyles(), (o = this.webAnimation) == null || o.cancel()
    }
    reconnected() {}
    async disconnected() {
        var o;
        if (!this.h || (this.options.id !== void 0 && wt.set(this.options.id, this.A), this.options.out === void 0)) return;
        if (this.prepare(), await so(), (o = this.i) == null ? void 0 : o.isConnected) {
            const i = this.o && this.o.parentNode === this.i ? this.o : null;
            if (this.i.insertBefore(this.element, i), this.options.stabilizeOut) {
                const a = this.m();
                this.log("stabilizing out");
                const r = this.A.left - a.left,
                    s = this.A.top - a.top;
                getComputedStyle(this.element).position !== "static" || r === 0 && s === 0 || (this.element.style.position = "relative"), r !== 0 && (this.element.style.left = r + "px"), s !== 0 && (this.element.style.top = s + "px")
            }
        }
        const e = this.j(this.options.keyframeOptions);
        await this.animate(this.options.out, e), this.element.remove()
    }
    prepare() {
        this.createFinished()
    }
    start() {
        var e, o;
        (o = (e = this.options).onStart) == null || o.call(e, this)
    }
    didFinish(e) {
        var o, i;
        e && ((i = (o = this.options).onComplete) == null || i.call(o, this)), this.A = void 0, this.animatingProperties = void 0, this.frames = void 0, this.resolveFinished()
    }
    O() {
        const e = [];
        for (let o = this.element.parentNode; o; o = o == null ? void 0 : o.parentNode) {
            const i = uo.get(o);
            i && !i.isDisabled() && i && e.push(i)
        }
        return e
    }
    get isHostRendered() {
        const e = ro.has(this.u);
        return e || this.u.updateComplete.then(() => {
            ro.add(this.u)
        }), e
    }
    j(e, o = this.O()) {
        const i = { ...Ja
        };
        return o.forEach(a => Object.assign(i, a.options.keyframeOptions)), Object.assign(i, e), i
    }
    N(e, o, i) {
        e = { ...e
        }, o = { ...o
        };
        const a = i.map(l => l.animatingProperties).filter(l => l !== void 0);
        let r = 1,
            s = 1;
        return a.length > 0 && (a.forEach(l => {
            l.width && (r /= l.width), l.height && (s /= l.height)
        }), e.left !== void 0 && o.left !== void 0 && (e.left = r * e.left, o.left = r * o.left), e.top !== void 0 && o.top !== void 0 && (e.top = s * e.top, o.top = s * o.top)), {
            from: e,
            to: o
        }
    }
    calculateKeyframes(e, o, i = !1) {
        const a = {},
            r = {};
        let s = !1;
        const l = {};
        for (const d in o) {
            const u = e[d],
                w = o[d];
            if (d in gt) {
                const p = gt[d];
                if (u === void 0 || w === void 0) continue;
                const b = p(u, w);
                b.transform !== void 0 && (l[d] = b.value, s = !0, a.transform = `${a.transform??""} ${b.transform}`, b.overrideFrom !== void 0 && Object.assign(a, b.overrideFrom))
            } else u !== w && u !== void 0 && w !== void 0 && (s = !0, a[d] = u, r[d] = w)
        }
        return a.transformOrigin = r.transformOrigin = i ? "center center" : "top left", this.animatingProperties = l, s ? [a, r] : void 0
    }
    async animate(e, o = this.options.keyframeOptions) {
        this.start(), this.frames = e;
        let i = !1;
        if (!this.isAnimating() && !this.isDisabled() && (this.options.onFrames && (this.frames = e = this.options.onFrames(this), this.log("modified frames", e)), e !== void 0)) {
            this.log("animate", [e, o]), i = !0, this.webAnimation = this.element.animate(e, o);
            const a = this.getController();
            a == null || a.add(this);
            try {
                await this.webAnimation.finished
            } catch {}
            a == null || a.remove(this)
        }
        return this.didFinish(i), i
    }
    isAnimating() {
        var e, o;
        return ((e = this.webAnimation) == null ? void 0 : e.playState) === "running" || ((o = this.webAnimation) == null ? void 0 : o.pending)
    }
    log(e, o) {
        this.shouldLog && !this.isDisabled() && console.log(e, this.options.id, o)
    }
}
const De = nt(Za);
var st = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let ke = class extends j {
    constructor() {
        super(...arguments), this.color = "neutral", this.wide = !1, this.footer = !1
    }
    render() {
        return c `
      <div class="page">
        <div
          class=${ti({page__container:!0,"page__container--wide":this.wide===!0,"page__container--neutral":this.color==="neutral","page__container--success":this.color==="success","page__container--warning":this.color==="warning"})}
        >
          <header class="page__header">
            <slot name="icon"></slot>
            <h1 class="page__title">
              <slot part="title"></slot>
            </h1>
          </header>
          <main class="page__body">
            <slot name="body"></slot>
          </main>
          ${this.footer===!0?c`
                <footer class="page__footer">
                  <p class="page__copy">
                    ${n("Copyright")} &copy;${new Date().getFullYear()}
                  </p>
                  <ul class="page__nav">
                    <li>
                      <a
                        class="page__link"
                        href="regulations.html"
                        target="_blank"
                        >${n("Regulamin")}</a
                      >
                    </li>
                    <li>
                      <a
                        class="page__link"
                        href="privacy-policy.html"
                        target="_blank"
                        >${n("Polityka prywatności")}</a
                      >
                    </li>
                    <li>
                      <a class="page__link" href="contact.html" target="_blank"
                        >${n("Kontakt")}</a
                      >
                    </li>
                  </ul>
                </footer>
              `:m}
        </div>
      </div>
    `
    }
};
ke.styles = [j.styles, L `
      .page {
        background-color: #ffffff;
        width: 100%;
        min-height: 100%;
      }
      .page__container {
        max-width: 48rem;
        background-color: #ffffff;
        padding: 2rem 1rem;
        margin: 0 auto;
        transition: all 0.5s ease-in-out;
      }
      .page__container--wide {
        max-width: 80rem;
      }
      .page__header {
        padding-bottom: 2rem;
        border-bottom: 1px solid #d6e2eb;
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
      }
      .page__header svg {
        stroke: #2bad57;
        width: 2rem;
        height: 2rem;
        display: inline-block;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      .page__title {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
        text-align: center;
      }
      .page__body {
        min-height: 18rem;
        font-size: 0.875rem;
        color: var(--adm-font-base);
      }
      .page__footer {
        margin-top: 2rem;
        text-align: center;
      }
      .page__copy {
        color: var(--adm-gray-500);
        font-size: 0.75rem;
        margin-bottom: 0.5rem;
      }
      .page__nav {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        justify-content: center;
      }
      .page__link {
        display: block;
        padding: 0 1rem;
        font-size: 0.75rem;
        color: var(--adm-gray-500);
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      .page__link:hover {
        font-size: 0.75rem;
        color: var(--adm-gray-800);
      }
      @media (min-width: 768px) {
        .page {
          padding: 4rem 0;
          background-color: var(--adm-gray-300);
        }
        .page__container {
          border-radius: 0.5rem;
          border-top-width: 4px;
          border-top-style: solid;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
          padding: 3rem 4rem;
        }
        .page__container--neutral {
          border-top-color: #4681f4;
        }
        .page__container--success {
          border-top-color: #2bad57;
        }
        .page__container--warning {
          border-top-color: #cf3838;
        }
        .page__header {
          padding-bottom: 2.5rem;
          margin-bottom: 2.5rem;
        }
        .page__header svg {
          width: 2.5rem;
          height: 2.5rem;
        }
        .page__title {
          font-size: 2rem;
        }
        .page__body {
          font-size: 1rem;
        }
        .page__footer {
          margin-top: 2.5rem;
        }
      }
    `];
st([A({
    reflect: !0
})], ke.prototype, "color", void 0);
st([A({
    type: Boolean,
    reflect: !0
})], ke.prototype, "wide", void 0);
st([A({
    type: Boolean
})], ke.prototype, "footer", void 0);
ke = st([I("adm-page"), q()], ke);
var Ue = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let me = class extends j {
    constructor() {
        super(...arguments), this.doc = "", this.form = {
            name: "",
            phone: "",
            email: "",
            message: "",
            accept: "off"
        }, this._typ = !1
    }
    render() {
        const e = c `
<h2>
  ${n("Definicje")}
</h2>
<ol start="1" type="1">
  <li>
    ${n(c`<strong>Administrator</strong> – podmiot wymieniony w Regulaminie, zarządzający Serwisem i będący jego właścicielem;`)}
  </li>
  <li>
    ${n(c`<strong>Klient</strong> – osoba fizyczna, osoba prawna lub inny podmiot posiadający zdolność prawną do zawarcia Umowy, składająca Zamówienie w Serwisie;`)}
  </li>
  <li>
    ${n(c`<strong>Konsument</strong> – Klient będący osobą fizyczną, składający Zamówienie i zawierający Umowę sprzedaży w celu niezwiązanym bezpośrednio z jego działalnością gospodarczą lub zawodową;`)}
  </li>
  <li>
    ${n(c`<strong>Oferta specjalna</strong> – akcje promocyjne oferowane przez Sprzedawcę przy składaniu zamówienia lub po jego złożeniu;`)}
  </li>
  <li>
    ${n(c`<strong>Produkty</strong> – rzeczy ruchome lub treści cyfrowe będące przedmiotem sprzedaży za pośrednictwem Serwisu;`)}
  </li>
  <li>
    ${n(c`<strong>Regulamin</strong> – niniejszy Regulamin;`)}
  </li>
  <li>
    ${n(c`<strong>Serwis</strong> – portal internetowy pod adresem <a href="${document.location.origin}" target="_blank">${document.location.origin}</a> w ramach którego prezentowana jest oferta nabycia Produktów i zawierana jest Umowa;`)}
  </li>
  <li>
    ${n(c`<strong>Sprzedawca</strong> – podmiot, który na podstawie umowy z Administratorem za pośrednictwem Serwisu kieruje do Użytkownika ofertę zawarcia Umowy i zakupu Produktów;`)}
  </li>
  <li>
    ${n(c`<strong>Świadczenie usług drogą elektroniczną / Usługi elektroniczne</strong> – wykonywanie Usługi na rzecz Użytkownika, które następuje poprzez wysyłanie i odbieranie danych za pomocą Systemów teleinformatycznych, na indywidualne żądanie Użytkownika, bez jednoczesnej obecności stron, przy czym dane te są transmitowane za pomocą sieci telekomunikacyjnej;`)}
  </li>
  <li>
    ${n(c`<strong>Umowa sprzedaży</strong> – umowa na mocy której Sprzedawca zobowiązuje się przenieść na Klienta własność Produktu, a Klient zobowiązuje się Produkt odebrać i zapłacić Sprzedawcy cenę;`)}
  </li>
  <li>
    ${n(c`<strong>Usługi</strong> – usługi objęte niniejszym Regulaminem, polegające w szczególności na:`)}
    <ol start="1" type="1">
      <li>
        ${n("zapewnieniu Użytkownikom dostępu do Serwisu;")}
      </li>
      <li>
       ${n("udostępnieniu treści marketingowych i informacji handlowych;")}
      </li>
      <li>
       ${n("udostępnieniu Formularza Zamówienia;")}
      </li>
      <li>
       ${n("przekazaniu danych z Formularza Zamówienia Sprzedawcy;")}
      </li>
      <li>
       ${n("przekazaniu danych dotyczących Zamówienia od Sprzedawcy do Użytkownika;")}
      </li>
    </ol>
  </li>
  <li>
    ${n(c`<strong>Użytkownik</strong> – korzystająca z Serwisu pełnoletnia osoba fizyczna posiadająca pełną zdolność do czynności prawnych oraz za zgodą przedstawiciela ustawowego, osoba małoletnia lub nieposiadająca pełnej zdolności do czynności prawnych;`)}
  </li>
  <li>
  ${n(c`<strong>Voucher</strong> – zakupiony przez Klienta bon wyemitowany przez Sprzedawcę, zawierający co najmniej wartość oraz datę ważności, uprawniający Klienta do obniżenia ceny sprzedaży Produktu o wartość Vouchera, na zasadach określonych w Regulaminie oraz Zasadach Korzystania z Voucherów, publikowanych przez Sprzedawcę;`)}
</li>
  <li>
    ${n(c`<strong>Zamówienie</strong> – oświadczenie woli Klienta, zmierzające bezpośrednio do zawarcia Umowy sprzedaży Produktów określające rodzaj i liczbę Produktów, składane poprzez Formularz Zamówienia znajdujący się w Serwisie lub w sposób, o którym mowa w części III Regulaminu;`)}
  </li>
</ol>
<h2>
  ${n("Postanowienia ogólne")}
</h2>
<ol start="1" type="1">
  <li>
    ${n("Regulamin określa:")}
    <ol start="1" type="1">
      <li>
        ${n("zasady korzystania przez Użytkowników z Serwisu;")}
      </li>
      <li>
        ${n("zasady składania Zamówienia i zawierania Umowy;")}
      </li>
      <li>
        ${n("zasady realizacji Zamówienia i dostawy;")}
      </li>
      <li>
        ${n("tryb postępowania reklamacyjnego.")}
      </li>
    </ol>
  </li>
  <li>
    ${n("Korzystanie z Serwisu wymaga posiadania aktualnej przeglądarki internetowej oraz urządzenia zdolnego do jej obsługi. Każdy z Użytkowników zapewnia sobie dostęp do tych urządzeń i systemów we własnym zakresie.")}
  </li>
  <li>
  ${n(c`Administratorem Serwisu jest NIKSMAT SOLUTIONS S.R.O. z siedzibą przy Soukenická 877/9, Moravská Ostrava, 702 00 Ostrava, e-mail: <a href="${"mailto:office@niksmat.cz"}">${"office@niksmat.cz"}</a>`)}
  </li>
  <li>
  ${n(c`<strong>Rozpoczęcie korzystania z Usług jest równoznaczne z zapoznaniem się z treścią i akceptacją warunków Regulaminu, Polityki prywatności, Polityki plików cookie oraz innych dokumentów regulujących realizację Usług za pomocą Serwisu.</strong> Administrator świadczy Usługi wyłącznie na zasadach określonych w Regulaminie i nie wyraża zgody na korzystanie z Serwisu niezgodnie z treścią Regulaminu.`)}
  </li>
  <li>
    ${n("Administrator jest właścicielem Serwisu i świadczy za jego pomocą Usługi. Administrator zajmuje się przedstawianiem informacji handlowych dotyczących Produktów oraz umożliwianiem Użytkownikom złożenia Zamówienia i zawarcia ze Sprzedawcą Umowy sprzedaży Produktów. Administrator nie jest Sprzedawcą Produktów i w zakresie dopuszczalnym przez przepisy prawa nie ponosi odpowiedzialności związanej z Produktami i Umową.")}
  </li>
  <li>
    ${n("Użytkownik przy korzystaniu z Serwisu jest zobowiązany do przestrzegania przepisów prawa i dobrych obyczajów, mając na uwadze poszanowanie dóbr osobistych i praw własności intelektualnej podmiotów trzecich. W szczególności Użytkownik nie może korzystać z Serwisu w sposób zakłócający jego funkcjonowanie np. poprzez użycie określonego oprogramowania lub urządzeń oraz rozsyłanie lub umieszczanie w Serwisie jakichkolwiek treści własnych, w tym niezamówionej informacji handlowej. Użytkownik nie może dostarczać Sprzedawcy ani Administratorowi treści o charakterze bezprawnym, obraźliwym, treści mogących wprowadzić w błąd. Administrator zastrzega sobie możliwość ograniczenia Użytkownikom korzystania z Serwisu w razie wykrycia działań niepożądanych.")}
  </li>
  <li>
    ${n("Zasady przetwarzania danych osobowych przez Administratora oraz Sprzedawcę zostały zawarte w Polityce Prywatności.")}
  </li>
</ol>
<h2>
  ${n("Złożenie zamówienia i zawarcie umowy sprzedaży")}
</h2>
<ol>
  <li>
    ${n("Informacje o ilości opakowań Produktów i ich cenie umieszczone w Serwisie stanowią ofertę w rozumieniu właściwych przepisów prawa. Akceptacja oferty następuje poprzez złożenie Zamówienia. Złożenie Zamówienia stanowi oświadczenie woli zawarcia Umowy przez Klienta i akceptację oferty.")}
  </li>
  <li>
    ${n("Jeżeli cena Produktu prezentowana w Serwisie jest obniżona w stosunku do ceny regularnej, Oferta specjalna obowiązuje wyłącznie do czasu jej modyfikacji lub usunięcia z Serwisu przez Administratora. Ofertę specjalną Sprzedawca może skierować do Konsumenta również w czasie rozmowy telefonicznej, o której mowa w ust. 6.")}
  </li>
  <li>
    ${n("Złożenie Zamówienia możliwe jest po akceptacji Regulaminu przez Klienta.")}
  </li>
  <li>
    ${n("Złożenie Zamówienia następuje przez podjęcie czynności technicznych wskazanych w Serwisie, polegających w szczególności na wypełnieniu pól formularza Zamówienia, akceptacji Regulaminu oraz zlecenia wprowadzenia Zamówienia do systemu Serwisu poprzez naciśnięcie przycisku zamówienia.")}
  </li>
  <li>
    ${n("Złożenie Zamówienia może także nastąpić w trakcie rozmowy telefonicznej Klienta z przedstawicielem Sprzedawcy, jeżeli Sprzedawca udostępnia taką możliwość.")}
  </li>
  <li>
    ${n("Klient ponosi pełną odpowiedzialność za prawidłowość danych wprowadzonych do Serwisu. Administrator zachowuje prawo do nieprzekazywania Sprzedawcy danych niekompletnych, nieprawdziwych, powtarzających się lub z innych przyczyn wskazujących na ich nieprawdziwość lub nierzetelność. Sprzedawca zachowuje prawo do odmowy realizacji Zamówienia, jeżeli weryfikacja danych Zamówienia z powyższych lub innych przyczyn uniemożliwia jego wykonanie.")}
  </li>
  <li>
    ${n("W przypadku dokonania przez Klienta zapłaty za Produkty przed dokonaniem przez Administratora lub Sprzedawcę weryfikacji, o której mowa w ust. 6, środki pieniężne są zwracane Klientowi niezwłocznie po stwierdzeniu braku możliwości realizacji Zamówienia, nie później niż w ciągu 14 dni od dnia jego złożenia.")}
  </li>
  <li>
    ${n("Czynności weryfikacyjne Sprzedawcy obejmują w szczególności weryfikację automatyczną danych Zamówienia, kontakt e-mail lub telefoniczny w celu potwierdzenia poprawności danych. Odmowa przeprowadzenia czynności weryfikacyjnych lub brak możliwości ich zakończenia może spowodować anulowanie Zamówienia, zgodnie z ust. 6.")}
  </li>
  <li>
    ${n("Do zawarcia Umowy sprzedaży dochodzi z chwilą zajścia pierwszego z następujących zdarzeń:")}
    <ol start="1" type="1">
      <li>
        ${n("dokonanie przez Klienta zapłaty za Produkty;")}
      </li>
      <li>
        ${n("odbiór Produktów przez Klienta.")}
      </li>
    </ol>
  </li>
  <li>
    ${n("Po złożeniu przez Klienta Zamówienia Sprzedawca przesyła Klientowi potwierdzenie Zamówienia.")}
  </li>
  <li>
    ${n("Na żądanie Klienta oraz w zgodzie z obowiązującymi przepisami, Sprzedawca dostarcza Klientowi fakturę VAT. Żądanie dostarczenia faktury powinno być zgłoszone Sprzedawcy przy składaniu Zamówienia.")}
  </li>
</ol>
<h2>
  ${n("Ceny i metody płatności")}
</h2>
<ol>
  <li>
    ${n("Ceny Produktów i Oferty specjalne prezentowane są w walucie obowiązującej w kraju sprzedaży. Ceny zawierają w sobie podatek VAT oraz cła i inne opłaty o podobnym charakterze związane ze sprzedażą i transportem Produktów do miejsca znajdującego się na obszarze, na którym Sprzedawca prowadzi działalność.")}
  </li>
  <li>
    ${n("Ceny nie zawierają w sobie ceł ani innych opłat o podobnym charakterze związanych z transportem Produktów do miejsca znajdującego się poza zakresem działalności prowadzonej przez Sprzedawcę.")}
  </li>
  <li>
    ${n("Sprzedawca stosuje płatność za pobraniem, płatność za pośrednictwem karty płatniczej oraz płatność za pośrednictwem PayPal lub innych pośredników płatności. Metody płatności stosowane przez Sprzedawcę mogą się różnić w zależności od kraju sprzedaży i są wymienione w Serwisie.")}
  </li>
</ol>
<h2>
  ${n("Dostawa produktów")}
</h2>
<ol>
  <li>
    ${n("Dostawa Produktów odbywa się za pośrednictwem firmy kurierskiej. W przypadku treści cyfrowych, dostawa Produktów odbywa się poprzez udostępnienie Klientowi kopii pliku na podany przez Klienta adres email. Sprzedawca nie ponosi odpowiedzialności za poprawność adresu email wskazanegpo przez Klienta.")}
  </li>
  <li>
    ${n("Koszty dostawy prezentowane są przy składaniu Zamówienia. Jeżeli koszty dostawy nie są prezentowane, dostawa jest darmowa.")}
  </li>
  <li>
    ${n("Wysyłka standardowa Produktów następuje w terminie 3 dni roboczych od dnia złożenia Zamówienia (czas procesowania zamówienia). Termin dostawy standardowej to 3 dni robocze od dnia wysyłki (czas dostawy). Kurier podejmuje dwie próby doręczenia, po czym paczka może oczekiwać na odbiór przez Klienta w punkcie odbioru przesyłek kuriera.")}
  </li>
  <li>
    ${n("W przypadku niedoręczenia Produktów Klientowi Sprzedawca podejmuje próbę kontaktu z Klientem. Ponowna przesyłka dokonywana jest na koszt Klienta. W razie bezskuteczności przesyłki Sprzedawca ma prawo odstąpić od Umowy. W takim przypadku Sprzedawca zwraca Klientowi cenę, jeżeli została uiszczona, pomniejszoną o koszty przesyłki.")}
  </li>
  <li>
    ${n("Klient ma obowiązek sprawdzenia Produktów niezwłocznie po doręczeniu w celu stwierdzenia czy Produkty nie uległy uszkodzeniu w czasie dostawy. Klient ponosi ryzyko przypadkowego uszkodzenia Produktów w czasie dostawy. W przypadku uszkodzeń Produktów należy niezwłocznie skontaktować się ze Sprzedawcą. Klient może także zgłosić wadę z tytułu rękojmi.")}
  </li>
  <li>
    ${n("W przypadku Klienta niebędącego Konsumentem, ryzyko przypadkowego uszkodzenia lub utraty Produktów przechodzi na Klienta w chwili wydania Produktów przewoźnikowi.")}
  </li>
</ol>
<h2>
  ${n("Odstąpienie od umowy")}
</h2>
<ol>
  <li>
    ${n("Klientowi będącemu Konsumentem przysługuje prawo do odstąpienia od Umowy w terminie 14 dni od dnia wejścia w posiadanie Produktu, bez podawania przyczyny. Oświadczenie o odstąpieniu od Umowy może być złożone w formie pisemnej lub elektronicznej.")}
  </li>
  <li>
   ${n("W celu skorzystania z prawa do odstąpienia od Umowy Konsument może skorzystać z formularza odstąpienia od Umowy załączonego do Regulaminu lub złożyć własne oświadczenie o jednoznacznej treści.")}
  </li>
  <li>
    ${n("Aby zachować termin do odstąpienia od Umowy wystarczy wysłanie oświadczenia o odstąpieniu przed upływem terminu.")}
  </li>
  <li>
    ${n(c`<strong>Prawo do odstąpienia od Umowy jest wyłączone w przypadku umowy, w których przedmiotem świadczenia jest rzecz dostarczona w zapieczętowanym opakowaniu, której po otwarciu opakowania nie można zwrócić ze względu na ochronę zdrowia lub ze względów higienicznych, jeżeli opakowanie zostało otwarte przez Konsumenta po dostarczeniu. Wyłączenie możliwości odstąpienia od umowy, o którym tu mowa dotyczy w szczególności Produktów z kategorii: suplementy diety, kosmetyki, wyroby medyczne.</strong>`)}
  </li>
  <li>
  ${n(c`<strong>Prawo do odstąpienia od Umowy jest wyłączone w przypadku umowy, w których przedmiotem świadczenia jest o dostarczanie treści cyfrowych niedostarczanych na nośniku materialnym, za które konsument jest zobowiązany do zapłaty ceny, jeżeli przedsiębiorca rozpoczął świadczenie za wyraźną i uprzednią zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po spełnieniu świadczenia przez przedsiębiorcę utraci prawo odstąpienia od umowy, i przyjął to do wiadomości, a przedsiębiorca przekazał konsumentowi potwierdzenie, o którym mowa w art. 15 ust. 1 i 2 albo art. 21 ust. 1 ustawy o prawach konsumenta. Wyłączenie możliwości odstąpienia od umowy, o którym tu mowa dotyczy w szczególności Produktów z kategorii: e-book.</strong>`)}
</li>
  <li>
    ${n("W przypadku odstąpienia przez Konsumenta od Umowy jest ona uważana za niezawartą. Sprzedawca zwraca Konsumentowi wszelkie otrzymane od niego środki, z wyłączeniem kosztów wynikających z wybranego przez Konsumenta sposobu dostarczenia Produktu, innego niż najtańszy zwykły sposób dostarczenia oferowany przez Sprzedawcę.")}
  </li>
  <li>
    ${n(c`W przypadku odstąpienia od Umowy Konsument jest zobowiązany do zwrotu Sprzedawcy otrzymanych Produktów na własny koszt w terminie 14 dni od dnia złożenia oświadczenia o odstąpieniu od Umowy. Zwrot przesyłką za pobraniem nie będzie akceptowany. <strong>Zwrot powinien obejmować wszystkie rzeczy otrzymane przez Konsumenta od Sprzedawcy, w tym rzeczy otrzymane za darmo w ramach złożonego Zamówienia.</strong>`)}
  </li>
  <li>
    ${n("Zwrot środków następuje w terminie 14 dni od dnia otrzymania od konsumenta zwrotu Produktów lub potwierdzenia nadania Produktów, w zależności od tego które z tych zdarzeń nastąpi wcześniej. Zwrot dokonywany jest na rachunek, z którego została dokonana płatność lub inny rachunek bankowy wskazany przez Klienta. W przypadku braku danych rachunku bankowego Sprzedawca występuje niezwłocznie o przekazanie danych, a zwrot następuje w terminie 14 dni od ich przekazania. Rachunek, na który zwracany są środki, musi należeć do Klienta lub osoby reprezentującej jej interesy i posiadającej stosowne umocowanie.")}
  </li>
  <li>
    ${n("Jeżeli dokonanie zwrotu w sposób określony w ust. 4 nie jest możliwe, Sprzedawca dokonuje zwrotu płatności przy użyciu takiego samego sposobu płatności, jakiego użył Konsument, chyba że Konsument wyraźnie zgodził się na inny sposób zwrotu, który nie wiąże się dla niego z żadnymi kosztami.")}
  </li>
  <li>
    ${n("Jeżeli w kraju zamieszkania Konsumenta w odniesieniu do sprzedaży konsumenckiej obowiązują postanowienia bardziej korzystane niż opisane powyżej, zastosowanie znajdują te postanowienia.")}
  </li>
  <li>
    ${n("W przypadku, gdy zamówienie Konsumenta obejmowało kilka Produktów lub Produkt i jeden lub więcej Voucherów, Konsument nie może odstąpić tylko od części Umowy. Złożone oświadczenie o częściowym odstąpieniu od Umowy Sprzedawca traktuje jak odstąpienie od całości Umowy.")}
  </li>
</ol>
<h2>
  ${n("Reklamacje")}
</h2>
<ol>
  <li>
    ${n("Jeżeli Produkt posiada wady fizyczne, Sprzedawca odpowiada z tytułu rękojmi zgodnie z obowiązującymi przepisami prawa. W celu rozpatrzenia reklamacji Klient musi złożyć reklamację oraz – gdy rozpoznanie reklamacji tego wymaga – odesłać przesyłkę do Sprzedawcy. W takim samym trybie Klient może zgłosić reklamację dotyczącą świadczenia Usług przez Administratora, przy czym w takim przypadku reklamacja powinna być skierowana do Administratora.")}
  </li>
  <li>
    ${n("Zgłoszenie reklamacyjne powinno zawierać:")}
    <ol start="1" type="1">
      <li>
        ${n("dane identyfikacyjne i kontaktowe Klienta;")}
      </li>
      <li>
        ${n("datę nabycia i nazwę Produktu;")}
      </li>
      <li>
        ${n("dokładne wymienienie wad Produktu;")}
      </li>
      <li>
        ${n("opis, kiedy i w jakich okolicznościach stwierdzono wady Produktu;")}
      </li>
      <li>
        ${n("żądania reklamującego;")}
      </li>
      <li>
        ${n("informacje pozwalające na realizację żądania (np. adres wysyłki lub numer rachunku bankowego);")}
      </li>
      <li>
        ${n("jeżeli reklamacja dotyczy Usług – opis i datę wystąpienia nieprawidłowości.")}
      </li>
    </ol>
  </li>
  <li>
    ${n("Zgłoszenia reklamacyjne składa się Sprzedawcy (i) na piśmie lub (ii) za pośrednictwem poczty e-mail.")}
  </li>
  <li>
    ${n("Zgłoszenia reklamacyjne Sprzedawca rozpoznaje w terminie 14 dni od dnia ich otrzymania. Odpowiedź na reklamację Sprzedawca wysyła na trwałym nośniku.")}
  </li>
  <li>
    ${n("W przypadku Umowy sprzedaży zawieranej z Klientem niebędącym jednocześnie Konsumentem, odpowiedzialność Sprzedawcy z tytułu rękojmi za wady Produktów zostaje wyłączona.")}
  </li>
  <li>
    ${n("W przypadku gdy w rezultacie uwzględnienia reklamacji Klientowi mają być zwrócone środki, Sprzedawca informuje Klienta czy będzie domagał się zwrotu Produktów przed zwrotem Klientowi środków. Zwrot realizowany jest w terminie 14 dni od dnia rozpoznania reklamacji lub otrzymania przez Sprzedawcę Produktów. Postanowienia art. VI ust. 6-8 stosuje się odpowiednio.")}
  </li>
  <li>
    ${n("W przypadku złożenia przez Konsumenta oświadczenia o odstąpieniu od umowy w stosunku do Zamówienia, którego częścią był jeden lub kilka Voucherów:")}
    <ol start="1" type="a">
      <li>
        ${n("oświadczenie o odstąpieniu od umowy obejmuje całość Zamówienia i nie może być złożone tylko co do części Zamówienia;")}
      </li>
      <li>
        ${n("Klient odstępujący od Umowy zobowiązany jest do zwrotu Sprzedawcy Voucherów lub podania ich kodów w celu ich weryfikacji i dezaktywacji;")}
      </li>
      <li>
        ${n("jeżeli Konsument nie przekaże Sprzedawcy Voucherów lub danych Voucherów albo okaże się, że Konsument zrealizował Voucher, Sprzedawca odmawia zwrotu odpowiedniej części ceny sprzedaży.")}
      </li>
    </ol>
  </li>
  <li>
    ${n("W przypadku złożenia przez Klienta reklamacji w stosunku do Zamówienia, którego częścią był jeden lub kilka Voucherów:")}
    <ol start="1" type="a">
      <li>
        ${n("uwzględnienie reklamacji dotyczącej Produktu może obejmować również zwrot ceny zapłaconej za Vouchery;")}
      </li>
      <li>
        ${n("w przypadku, o którym mowa w pkt 4.1. warunkiem zwrotu ceny za Vouchery jest ich zwrot lub podanie Sprzedawcy Kodu Voucherów w celu dezaktywacji;")}
      </li>
      <li>
        ${n("w razie wykorzystania Vouchera zwrot ceny Vouchera nie jest możliwy.")}
      </li>
    </ol>
  </li>
</ol>
<h2>
  ${n("Pozasasowe sposoby rozpatrywania reklamacji i dochodzenia roszczeń")}
</h2>
<ol>
  <li>
    ${n("Klient chcący zgłosić reklamację lub dochodzić roszczeń wobec Sprzedawcy może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń. Skorzystanie z tych sposobów ma charakter dobrowolny i może mieć miejscu, gdy obie strony sporu wyrażą na to zgodę.")}
  </li>
  <li>
    ${n(c`Komisja Europejska udostępnia platformę do internetowego rozstrzygania sporów między Konsumentami i Przedsiębiorcami (platforma ODR). Jest ona dostępna pod adresem: <a href="http://ec.europa.eu/consumers/odr/" target="_blank">http://ec.europa.eu/consumers/odr/</a>.`)}
  </li>
</ol>
<h2>
  ${n("Postanowienia końcowe")}
</h2>
<ol>
  <li>
    ${n("Sądem właściwym dla rozstrzygania sporów z Konsumentami jest sąd właściwy według miejsca zamieszkania Konsumenta. W przypadku Klientów nie będących Konsumentami, sądem właściwym jest Sąd właściwy według siedziby Sprzedawcy.")}
  </li>
  <li>
    ${n("Z zastrzeżeniem powszechnie obowiązujących przepisów prawa, prawem właściwym dla Umowy jest prawo siedziby Sprzedawcy.")}
  </li>
</ol>
<br>
<p>
  <a .href=${H("return-form","return-form.pdf",y())}>${n("Wzór oświadczenia o odstąpieniu od Umowy")}</a>
</p>
    `,
            o = c `
    <h2>
      ${n("Definicje")}
    </h2>
    <ol start="1" type="1">
      <li>
        ${n(c`<strong>Administrator</strong> – podmiot wymieniony w Regulaminie;`)}
      </li>
      <li>
        ${n(c`<strong>Dane osobowe</strong> – wszystkie informacje o osobie fizycznej zidentyfikowanej lub możliwej do zidentyfikowania poprzez jeden bądź kilka szczególnych czynników określających fizyczną, fizjologiczną, genetyczną, psychiczną, ekonomiczną, kulturową lub społeczną tożsamość, w tym IP urządzenia, dane o lokalizacji, identyfikator internetowy oraz informacje gromadzone za pośrednictwem plików cookie oraz innej podobnej technologii;`)}
      </li>
      <li>
        ${n(c`<strong>Polityka</strong> – niniejsza Polityka Prywatności;`)}
      </li>
      <li>
        ${n(c`<strong>RODO</strong> – Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE;`)}
      </li>
      <li>
        ${n(c`<strong>Użytkownik</strong> – korzystająca z Serwisu pełnoletnia osoba fizyczna posiadająca pełną zdolność do czynności prawnych oraz za zgodą przedstawiciela ustawowego, osoba małoletnia lub nieposiadająca pełnej zdolności do czynności prawnych;`)}
      </li>
    </ol>
    <h2>
      ${n("Cele przetwarzania danych")}
    </h2>
    <ol start="1" type="1">
      <li>
        ${n("Dane, w tym dane osobowe Użytkowników są zbierane i przetwarzane w celu:")}
        <ol start="1" type="1">
          <li>
            ${n("korzystania z Serwisu;")}
          </li>
          <li>
            ${n("składania i realizacji Zamówień;")}
          </li>
          <li>
            ${n("prowadzenia działań marketingowych, w tym reklamy kontekstowej i reklamy behawioralnej;")}
          </li>
          <li>
            ${n("marketingu bezpośredniego, jeżeli Użytkownik wyraził na to zgodę.")}
          </li>
        </ol>
      </li>
      <li>
        ${n("Dane osobowe wszystkich osób korzystających z Serwisu (w tym adres IP oraz informacje gromadzone za pośrednictwem plików cookies lub innych podobnych technologii) przetwarzane są przez Administratora:")}
        <ol start="1" type="1">
          <li>
            ${n("w celu świadczenia usług drogą elektroniczną w Serwisie (art. 6 ust. 1 lit b RODO);")}
          </li>
          <li>
            ${n("w celu obsługi zamówień składanych w Serwisie, w tym w celu przekazania Sprzedawcy (art. 6 ust. 1 lit b RODO);")}
          </li>
          <li>
            ${n("w celu obsługi reklamacji przez Sprzedawcę (art. 6 ust. 1 lit b RODO);")}
          </li>
          <li>
            ${n("w celach analitycznych i statystycznych (art. 6 ust. 1 lit f RODO);")}
          </li>
          <li>
            ${n("w celu prowadzenia marketingu kontekstowego (art. 6 ust. 1 lit f RODO);")}
          </li>
          <li>
            ${n("w celach technicznych (art. 6 ust. 1 lit f RODO).")}
          </li>
        </ol>
      </li>
      <li>
        ${n("Złożenie zamówienia przez Użytkownika Serwisu wiąże się z przetwarzaniem jego danych osobowych. Podanie danych oznaczonych jako obowiązkowe jest wymagane w celu przyjęcia i obsługi zamówienia. Złożenie zamówienia przez Użytkownika powoduje, że dane osobowe Użytkownika, niezbędne do realizacji zamówienia będą udostępnione sprzedawcy, w celu wykonania umowy. Dane osobowe są przetwarzane:")}
        <ol start="1" type="1">
          <li>
            ${n("w celu realizacji złożonego zamówienia (art. 6 ust. 1 lit. b RODO);")}
          </li>
          <li>
            ${n("w celu realizacji obowiązków ustawowych ciążących na Administratorze i Sprzedawcy (art. 6 ust. 1 lit. c RODO);")}
          </li>
          <li>
            ${n("w celach analitycznych i statystycznych (art. 6 ust. 1 lit. f RODO);")}
          </li>
          <li>
            ${n("w celach dochodzenia roszczeń (art. 6 ust. 1 lit. f RODO);")}
          </li>
          <li>
            ${n("w celach badania satysfakcji (art. 6 ust. 1 lit. f RODO).")}
          </li>
        </ol>
      </li>
      <li>
        ${n("Administrator przetwarza dane osobowe Użytkowników w celu realizowania działań marketingowych, które mogą polegać na:")}
        <ol start="1" type="1">
          <li>
            ${n("wyświetlaniu Użytkownikowi treści marketingowych, które nie są dostosowane do jego preferencji (art. 6 ust. 1 lit. f RODO);")}
          </li>
          <li>
            ${n("kierowaniu powiadomień w-mail lub SMS o ofertach lub treściach, które w niektórych przypadkach zawierają informacje handlowe, w zakresie udzielonej zgody (art. 6 ust. 1 lit. f RODO).")}
          </li>
        </ol>
      </li>
    </ol>
    <h2>
      ${n("Pliki cookies")}
    </h2>
    <ol>
      <li>
        ${n("Pliki cookies to małe pliki tekstowe instalowane na urządzeniu Użytkownika przeglądającego Serwis. Cookies zbierają informacje ułatwiające korzystanie ze strony internetowej – np. poprzez zapamiętywanie odwiedzin Użytkownika w Serwisie i dokonywanych przez niego czynności.")}
      </li>
      <li>
          ${n("Administrator wykorzystuje tzw. cookie serwisowe przede wszystkim w celu dostarczania Użytkownikowi usług świadczonych drogą elektroniczną oraz poprawy jakości tych usług. W związku z tym Administrator oraz inne podmioty świadczące na jego rzecz usługi analityczne i statystyczne korzystają z plików cookies, przechowując informacje lub uzyskując dostęp do informacji już przechowywanych w telekomunikacyjnym urządzeniu końcowym Użytkownika (komputer, telefon, tablet itp.). Pliki cookies wykorzystywane w tym celu obejmują:")}
        <ol start="1" type="1">
          <li>
            ${n("pliki cookies z danymi wprowadzanymi przez Użytkownika (identyfikator sesji) na czas trwania sesji (ang. user input cookies);")}
          </li>
          <li>
            ${n("uwierzytelniające pliki cookies wykorzystywane do usług wymagających uwierzytelniania na czas trwania sesji (ang. authentication cookies);")}
          </li>
          <li>
            ${n("pliki cookies służące do zapewnienia bezpieczeństwa, np. wykorzystywane do wykrywania nadużyć w zakresie uwierzytelniania (ang. user centric security cookies);")}
          </li>
          <li>
            ${n("sesyjne pliki cookies odtwarzaczy multimedialnych (np. pliki cookies odtwarzacza flash), na czas trwania sesji (ang. multimedia player session cookies);")}
          </li>
          <li>
            ${n("pliki cookies służące do monitorowania ruchu na stronie internetowej.")}
          </li>
        </ol>
      </li>
      <li>
        ${n("Administrator wykorzystuje również pliki cookies do celów marketingowych, W tym celu Administrator przechowuje informacje lub uzyskuje dostęp do informacji już przechowywanych w telekomunikacyjnym urządzeniu końcowym Użytkownika (komputer, telefon, tablet itp.). Wykorzystanie plików cookies oraz zebranych za ich pośrednictwem danych osobowych w celach marketingowych, w szczególności w zakresie promowania usług i towarów podmiotów trzecich, wymaga uzyskania zgody Użytkownika. Zgoda ta może być wyrażona poprzez odpowiednią konfigurację przeglądarki, a także może zostać w każdym momencie wycofana, w szczególności poprzez wyczyszczenie historii cookies oraz wyłączenie obsługi cookies w ustawieniach przeglądarki.")}
      </li>
    </ol>
    <h2>
      ${n("Okres przechowywania danych")}
    </h2>
    <ol>
      <li>
        ${n("Dane przetwarzane są przez czas świadczenia usługi lub realizowania zamówienia, do czasu wycofania wyrażonej zgody lub zgłoszenia skutecznego sprzeciwu względem przetwarzania danych w przypadkach, gdy podstawą prawną przetwarzania danych jest uzasadniony interes Administratora.")}
      </li>
      <li>
        ${n("Okres przetwarzania danych może być przedłużony w przypadku, gdy przetwarzanie jest niezbędne do ustalenia i dochodzenia ewentualnych roszczeń lub obrony przed nimi, a po tym czasie jedynie w przypadku i w zakresie, w jakim będą wymagać tego przepisy prawa. Po upływie okresu przetwarzania dane są nieodwracalnie usuwane lub anonimizowane.")}
      </li>
    </ol>
    <h2>
      ${n("Uprawnienia Użytkownika")}
    </h2>
    <ol>
      <li>
        ${n("Prawo do informacji o przetwarzaniu danych osobowych – na tej podstawie osobie zgłaszającej takie żądanie Administrator przekazuje informację o przetwarzaniu danych osobowych, w tym przede wszystkim o celach i podstawach prawnych przetwarzania, zakresie posiadanych danych, podmiotach, którym dane osobowe są ujawniane i planowanym terminie ich usunięcia.")}
      </li>
      <li>
        ${n("Prawo uzyskania kopii danych – na tej podstawie Administrator przekazuje kopię przetwarzanych danych, dotyczących osoby zgłaszającej żądanie.")}
      </li>
      <li>
        ${n("Prawo do sprostowania – na tej podstawie Administrator usuwa ewentualne niezgodności lub błędy dotyczące przetwarzanych danych osobowych, oraz uzupełnia je lub aktualizuje, jeśli są niekompletne lub uległy zmianie.")}
      </li>
      <li>
        ${n("Prawo do usunięcia danych – na tej podstawie można żądać usunięcia danych, których przetwarzanie nie jest już niezbędne do realizowania żadnego z celów, dla których zostały zebrane.")}
      </li>
      <li>
        ${n("Prawo do ograniczenia przetwarzania – na tej podstawie Administrator zaprzestaje dokonywania operacji na danych osobowych, z wyjątkiem operacji, na które wyraziła zgodę osoba, której dane dotyczą oraz ich przechowywania, zgodnie z przyjętymi zasadami retencji, lub dopóki nie ustaną przyczyny ograniczenia przetwarzania danych (np. zostanie wydana decyzji organu nadzorczego, zezwalająca na dalsze przetwarzanie danych).")}
      </li>
      <li>
        ${n("Prawo do przenoszenia danych – na tej podstawie, w zakresie w jakim dane są przetwarzane w związku z zawartą umową lub wyrażoną zgodą, Administrator wydaje dane dostarczone przez osobę, której one dotyczą, w formacie pozwalającym na ich odczyt przez komputer. Możliwe jest także zażądanie przesłania tych danych innemu podmiotowi – jednak pod warunkiem, że istnieją w tym zakresie techniczne możliwości zarówno po stronie Administratora jak i tego innego podmiotu.")}
      </li>
      <li>
        ${n("Prawo sprzeciwu wobec przetwarzania danych w celach marketingowych – osoba, której dane dotyczą, może w każdym czasie sprzeciwić się przetwarzaniu danych osobowych w celach marketingowych.")}
      </li>
      <li>
        ${n("Prawo sprzeciwu wobec przetwarzania danych w celach związanych z badaniem satysfakcji – osoba, której dane dotyczą, może w każdym czasie sprzeciwić się przetwarzaniu danych osobowych w celach związanych z badaniem satysfakcji.")}
      </li>
      <li>
        ${n("Prawo sprzeciwu wobec innych celów przetwarzania danych – osoba, której dane dotyczą, może w każdym czasie sprzeciwić się przetwarzaniu danych osobowych na podstawie uzasadnionego interesu Administratora (np. dla celów analitycznych lub statystycznych lub ze względów związanych z ochroną mienia). Sprzeciw w tym zakresie powinien zawierać uzasadnienie oraz podlega ocenie Administratora.")}
      </li>
      <li>
        ${n("Prawo wycofania zgody – jeśli dane przetwarzane są na podstawie zgody osoba, której dane dotyczą, ma prawo ją wycofać w dowolnym momencie, co jednak nie wpływa na zgodność z prawem przetwarzania dokonanego przed wycofaniem tej zgody.")}
      </li>
      <li>
        ${n("Prawo do skargi – w przypadku uznania, że przetwarzanie danych osobowych narusza przepisy RODO lub inne przepisy dotyczące ochrony danych osobowych, osoba, której dane dotyczą, może złożyć skargę do właściwego organu krajowego.")}
      </li>
      <li>
        ${n("Wniosek dotyczący realizacji uprawnień należy złożyć na adres Administratora wskazany w Regulaminie.")}
      </li>
    </ol>
    <h2>
      ${n("Przekazywanie i bezpieczeństwo danych")}
    </h2>
    <ol>
      <li>
        ${n("Dla realizacji celów opisanych powyżej dane osobowe mogą być ujawniane zewnętrznym podmiotom, w tym w szczególności dostawcom podmiotom takim jak banki i operatorzy płatności, podmiotom świadczącym usługi księgowe, prawne, przewozowe, marketingowe oraz podmiotom powiązanym z Administratorem. W przypadku złożenia zamówienia dane Użytkownika zostaną ujawnione Sprzedawcy w celu zawarcia i wykonania umowy sprzedaży.")}
      </li>
      <li>
        ${n("Dane osobowe Użytkowników nie są przekazywane poza EOG.")}
      </li>
      <li>
        ${n("Administrator na bieżąco prowadzi analizę ryzyka w celu zapewnienia, że dane osobowe przetwarzane są przez niego w sposób bezpieczny – zapewniający przede wszystkim, że dostęp do danych mają jedynie osoby upoważnione i jedynie w zakresie, w jakim jest to niezbędne ze względu na wykonywane przez nie zadania. Administrator dba o to, by wszystkie operacje na danych osobowych były rejestrowane i dokonywane jedynie przez uprawnionych pracowników i współpracowników.")}
      </li>
      <li>
        ${n("Administrator podejmuje wszelkie niezbędne działania, by także jego podwykonawcy i inne podmioty współpracujące dawały gwarancję stosowania odpowiednich środków bezpieczeństwa w każdym przypadku, gdy przetwarzają dane osobowe na zlecenie Administratora.")}
      </li>
    </ol>
    <h2>
      ${n("Postanowienia końcowe")}
    </h2>
    <ol>
      <li>
        ${n("Administrator zastrzega sobie możliwość zmiany niniejszej Polityki.")}
      </li>
      <li>
        ${n("Z zastrzeżeniem powszechnie obowiązujących przepisów prawa, prawem właściwym dla niniejszej Polityki jest prawo siedziby Administratora.")}
      </li>
    </ol>
    `,
            i = c `
    <h2>
      <strong>${n("NIKSMAT SOLUTIONS S.R.O.")}</strong>
    </h2>
    <ul>
      <li>
        ${n("Soukenická 877/9")}
      </li>
      <li>
        ${n(c`Moravská Ostrava,<br>702 00 Ostrava`)}
      </li>
      <li>
        ${n(c`<a href="mailto:office@niksmat.cz">office@niksmat.cz</a>`)}
      </li>
      <li>
        ${n("VAT: CY10368437Y")}
      </li>
    </ul>
    `,
            a = c `
      <form
        id="form"
        class="legal__form form"
        @submit="${this._handleSubmit}"
        ${De({keyframeOptions:{duration:500,easing:"ease-in-out"},in:Ee,out:Ce,stabilizeOut:!0,skipInitial:!0})}
      >
        <div class="form__grid">
          <div class="form__item">
            <label for="phone"
              >${n("Imię i nazwisko")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Imię i nazwisko")}"
              type="text"
              name="name"
              id="name"
              .value=${C(this.form.name)}
              @input=${this.changeValue}
            />
          </div>

          <div class="form__item form__item--half">
            <label for="email"
              >${n("Adres email")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Adres email")}"
              type="text"
              name="email"
              id="email"
              .value=${C(this.form.email)}
              @input=${this.changeValue}
            />
          </div>

          <div class="form__item form__item--half">
            <label for="phone"
              >${n("Telefon")}<span class="form__req">*</span></label
            >
            <input
              placeholder="${n("Telefon")}"
              type="text"
              name="phone"
              id="phone"
              .value=${C(this.form.phone)}
              @input=${this.changeValue}
            />
          </div>

          <div class="form__item">
            <label for="message"
              >${n("Treść wiadomości")}<span class="form__req">*</span></label
            >
            <textarea
              type="text"
              name="message"
              id="message"
              .value=${C(this.form.message)}
              @input=${this.changeValue}
            ></textarea>
          </div>
          <div class="form__item">
            <div class="form__group form__group--start">
              <div class="form__checkbox">
                <input
                  type="checkbox"
                  name="accept"
                  id="accept"
                  ?checked=${this.form.accept==="on"}
                  @change=${this.changeRegulations}
                  required
                />
              </div>
              <div class="form__description">
                <label for="accept">
                  ${n(c`Akceptuję <a href="privacy-policy.html" target="_blank">Politykę Prywatności</a>.`)}
                </label>
                <p>
                  ${n(c`Twoje dane są gromadzone przez NIKSMAT SOLUTIONS S.R.O. w celu obsługi Twojego wniosku i udzielenia odpowiedzi na zadane pytania. Dane te nie będą wykorzystywane do żadnych innych celów bez Twojej uprzedniej zgody. Aby dowiedzieć się więcej na temat zasad na jakich przetwarzamy Twoje dane oraz o przysługujących Ci w związku z tym prawach, zapoznaj się z <a href="privacy-policy.html" target="_blank">Polityką Prywatności</a>.`)}
                </p>
              </div>
            </div>
          </div>
          <div class="form__item">
            <button id="submit" type="submit">
              ${n("Wyślij wiadomość")}
            </button>
          </div>
        </div>
      </form>
    `,
            r = c `<section
      class="legal__typ"
      ${De({keyframeOptions:{duration:500,easing:"ease-in-out"},in:Ee,out:Ce,stabilizeOut:!0,skipInitial:!0})}
    >
      <p>${n("Dziękujemy za wiadomość!")}</p>
    </section>`,
            s = c ` ${this._typ?r:a} `;
        return c `
      <adm-page color="neutral" wide footer>
        ${this._getTheTitle()}
        <div
          slot="body"
          class=${ti({legal:!0,"legal--unstyled":this.doc==="imprint"})}
        >
          ${this.doc==="regulations"?e:m}
          ${this.doc==="privacy"?o:m}
          ${this.doc==="imprint"?i:m}
          ${this.doc==="contact"?s:m}
        </div>
      </adm-page>
    `
    }
    _getTheTitle() {
        switch (this.doc) {
            case "privacy":
                return c `${n("Polityka prywatności")}`;
            case "regulations":
                return c `${n("Regulamin")}`;
            case "contact":
                return c `${n("Kontakt")}`;
            case "imprint":
                return c `${n("Impressum")}`;
            default:
                return m
        }
    }
    changeRegulations(e) {
        e.target.checked ? this.form.accept = "on" : this.form.accept = "off"
    }
    changeValue(e) {
        const o = e.target;
        this.form[o.name] = o.value
    }
    _handleSubmit(e) {
        e.preventDefault(), this._submit.disabled = !0;
        const o = this._buildFeedback();
        this._sendFeedback(o)
    }
    _buildFeedback() {
        let e = {};
        return e = { ...this.form,
            offer_code: `${this._config.offerCode}1${Y(this._config.market)}`
        }, e
    }
    _sendFeedback(e) {
        G.url("feedbacks").post({
            feedback: e
        }).json().then(o => (this._typ = !0, o)).catch(() => {
            this._submit.disabled = !1
        })
    }
};
me.styles = [j.styles, Ct, L `
      .legal {
        counter-reset: heading;
      }
      h2 {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
      }
      h2::before {
        counter-increment: heading;
        content: counter(heading, upper-roman) '. ';
      }
      ol + h2 {
        margin-top: 1.5rem;
      }
      ol,
      ul {
        list-style-position: inside;
      }
      ol ol,
      ol ul,
      ul ol,
      ul ul {
        padding-left: 1.5rem;
      }
      li,
      p {
        font-size: 0.875rem;
        margin-bottom: 0.125rem;
      }
      ol li,
      ul li {
        margin-top: 0.125rem;
      }
      a {
        color: var(--adm-blue-500);
        transition: color 0.2s ease-in-out;
      }
      a:hover {
        color: var(--adm-blue-800);
      }
      .legal--unstyled ul,
      .legal--unstyled ol {
        list-style: none;
      }
      .legal--unstyled h2::before {
        content: none;
      }
      .legal__form {
        max-width: 48rem;
        margin: 0 auto;
      }
      .legal__form button {
        background-color: var(--adm-blue-500);
        border-color: var(--adm-blue-500);
        color: #ffffff;
      }
      .legal__form button:hover {
        background-color: var(--adm-blue-600);
        border-color: var(--adm-blue-600);
        color: #ffffff;
      }
      .legal__typ {
        text-align: center;
      }
      .legal__typ p {
        font-size: 1.125rem;
      }
      @media (min-width: 768px) {
        h2 {
          font-size: 1.375rem;
        }
      }
    `];
Ue([A({
    type: String
})], me.prototype, "doc", void 0);
Ue([A({
    type: Object,
    attribute: !1
})], me.prototype, "form", void 0);
Ue([E()], me.prototype, "_typ", void 0);
Ue([U("#submit")], me.prototype, "_submit", void 0);
me = Ue([I("adm-legal"), q()], me);
var ii = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let tt = class extends ze {
    constructor() {
        super(...arguments), this.href = ""
    }
    render() {
        return c `
      <div @click=${this._getLinkURL}>
        <slot></slot>
      </div>
    `
    }
    _getLinkURL() {
        setTimeout(() => {
            window.location.href = aa(this.href)
        }, 100)
    }
};
tt.styles = L `
    :host {
      cursor: pointer;
      display: inline;
    }
  `;
ii([A({
    type: String
})], tt.prototype, "href", void 0);
tt = ii([I("adm-link")], tt);

function Z(t) {
    switch (t) {
        case "bg":
            return " лв";
        case "cs":
            return " Kč";
        case "hu":
            return " Ft";
        case "pl":
        case "uk":
            return " zł";
        case "ro":
            return " lei";
        default:
            return "€"
    }
}

function po(t) {
    switch (t) {
        case "bg":
            return 9;
        case "cs":
            return 120;
        case "hu":
            return 1600;
        case "pl":
        case "uk":
            return 19;
        case "ro":
            return 20;
        default:
            return 5
    }
}

function Xa(t) {
    switch (t) {
        case "cs":
            return 1e3;
        case "hu":
            return 6e3;
        case "hr":
        case "sk":
            return 20;
        case "ro":
            return 100;
        default:
            return 30
    }
}

function Ya(t) {
    switch (t) {
        case "cs":
            return 1500;
        case "hu":
            return 12e3;
        case "ro":
        case "pl":
            return 100;
        default:
            return 30
    }
}

function x(t, e) {
    const o = `${Xa(e)}${Z(e)}`,
        i = `${Ya(e)}${Z(e)}`,
        a = `${po(e)}${Z(e)}`,
        r = `${Math.round(t)}${Z(e)}`,
        s = `${Math.round(1.9*t)}${Z(e)}`,
        l = `${Math.round(.9*t)}${Z(e)}`,
        d = `${Math.round(1.9*t)-Math.round(.9*t)}${Z(e)}`,
        u = `${Math.round(3.8*t)+po(e)}${Z(e)}`,
        w = `${Math.round(1.7*t)}${Z(e)}`,
        p = `${Math.round(1.53*t)}${Z(e)}`;
    return {
        voucherPrice: o,
        voucherUpsellPrice: i,
        deliveryPrice: a,
        standardAfterPrice: r,
        standardBeforePrice: s,
        promoPrice: l,
        promoSavings: d,
        upsellBeforePrice: u,
        upsellAfterPrice: w,
        promoUpsellAfterPrice: p
    }
}
var Et = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let Re = class extends j {
    constructor() {
        super(), this.short = !1, this._countDown()
    }
    render() {
        return c `
      <adm-page color="warning" footer>
        ${n("Gratulacje! Jeszcze lepsza okazja!")}
        <div slot="body" class="promo">
          <h2 class="promo__subtitle">
            ${n("Czy to przez chwilowy brak gotówki chcesz odebrać sobie pewną szansę na wymarzone efekty?")}
          </h2>
          <p>
            ${n("Twoje samopoczucie jest cenniejsze od pieniędzy, dlatego przez najbliższe")}
          </p>
          <div class="promo__timer">
            <span id="timer">3:00</span>
          </div>
          <p>
            ${n(c`możesz odebrać <strong>DODATKOWE DOFINANSOWANIE</strong> w kwocie aż ${x(this._product.price,y()).promoSavings}.`)}
            <br />
            ${n(c`Dzięki temu tylko teraz zamiast ${x(this._product.price,y()).standardBeforePrice} zapłacisz jedyne <strong>${x(this._product.price,y()).promoPrice}</strong>.`)}
          </p>
          <div
            class="${this._config.flow==="react"?"promo__product promo__product--react":"promo__product"}"
          >
            ${this._config.flow==="react"?c`
                  <div>
                    <img
                      .src="${this._getPackshotURL("small")}"
                      alt="Packshot"
                    />
                  </div>
                  <div>
                    <img
                      .src="${this._getPackshotURL("small")}"
                      alt="Packshot"
                    />
                  </div>
                `:c`
                  <img .src="${this._getPackshotURL("small")}" alt="Packshot" />
                `}
          </div>
          <div class="promo__price">
            <span class="promo__price--before">
              ${x(this._product.price,y()).standardBeforePrice}
            </span>
            <span class="promo__price--after">
              ${x(this._product.price,y()).promoPrice}
            </span>
          </div>
          <p>
            ${n(c`Odbierz dofinansowanie TERAZ i oszczędź aż ${x(this._product.price,y()).promoSavings}!`)}
            <br />
            ${n(c`To <strong>jednorazowa oferta</strong> promocyjna, która przepada po zamknięciu tej strony.`)}
          </p>
          <div class="promo__form">
            ${this._config.hideVoucher!==!0&&(this._config.flow==="upsell"||this._config.flow==="standard")?c`<adm-voucher .product=${this._product.name}></adm-voucher>`:m}
            ${this.short?c`<adm-short-form promo></adm-short-form>`:c`<adm-form promo></adm-form>`}
          </div>
        </div>
      </adm-page>
    `
    }
    _countDown() {
        const e = new Date(Date.now() + 18e4).getTime(),
            o = setInterval(() => {
                const i = e - Date.now() + 1e3,
                    a = Math.floor(i % (1e3 * 60 * 60) / (1e3 * 60)),
                    r = Math.floor(i % (1e3 * 60) / 1e3);
                this._timer.innerHTML = `${a}:${`0${r}`.slice(-2)}`, i <= 1e3 && clearInterval(o)
            }, 1e3)
    }
    _getPackshotURL(e) {
        const o = this._config.offerCode.slice(0, -1).toLowerCase();
        return H("packshots", `${o}-${e}.png`)
    }
};
Re.styles = [j.styles, L `
      .promo {
        text-align: center;
      }
      .promo__subtitle {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .promo p {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
      .promo__timer {
        font-size: 1.5rem;
        font-weight: 700;
        color: #cf3838;
        margin-bottom: 0.5rem;
      }
      .promo__product {
        border-radius: 0.5rem;
        background-color: var(--adm-gray-50);
        padding: 1rem;
        margin: 2rem 0 0.25rem;
      }
      .promo__product--react {
        display: flex;
        justify-content: center;
      }
      .promo__product img {
        display: block;
        margin: 0 auto;
        max-height: 15rem;
      }
      .promo__price {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 1rem;
      }
      .promo__price--before {
        color: #cf3838;
        text-decoration: line-through;
        padding-right: 0.5rem;
      }
      .promo__price--after {
        font-weight: 700;
        color: #2bad57;
      }
      .promo__form {
        margin-top: 2rem;
        text-align: left;
      }
      @media (min-width: 768px) {
        .promo__subtitle {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .promo p {
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        .promo__timer {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
      }
    `];
Et([A({
    type: Boolean
})], Re.prototype, "short", void 0);
Et([U("#timer")], Re.prototype, "_timer", void 0);
Re = Et([I("adm-promo"), q()], Re);
var ai = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let ot = class extends j {
    render() {
        const e = c `
      <p>
        ${n("U osób po 35. roku życia proces chudnięcia bywa znacznie spowolniony, a często po prostu zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by zacząć spalać tkankę tłuszczową i zbijać kilogramy.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ przejdziesz metamorfozę marzeń bez względu na Twój wiek. Pozbędziesz się nadmiaru tkanki tłuszczowej, maksymalnie podkręcisz metabolizm i <strong>zrzucisz nawet 15 kilogramów w 21 dni</strong>. Szybciej i łatwej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły odchudzającej – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 35. roku życia.`)}
      </p>
    `,
            o = c `
      <p>
        ${n("U kobiet po 40. roku życia procesy regeneracyjne komórek skóry bywają zablokowane do tego stopnia, że potrzeba naprawdę silnej broni, by cofnąć oznaki starzenia...")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ przejdziesz metamorfozę marzeń bez względu na Twój wiek. Ujędrnisz skórę, usuniesz zmarszczki i <strong>cofniesz czas dla swojej twarzy nawet o 30 lat</strong>. Szybciej i łatwej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły odmładzającej – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie kobietom po 40. roku życia.`)}
      </p>
    `,
            i = c `
      <p>
        ${n("U osób po 45. roku życia dochodzi do zmian w stawach oraz mięśniach, a proces regeneracji jest zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by odwrócić te niebezpieczne zmiany i zachować pełną sprawność.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoje stawy oraz mięśnie zregenerują się w 100% bez względu na Twój wiek. Przywrócisz właściwe działanie stawu, zregenerujesz chrząstkę stawową, pozbędziesz się zmian reumatycznych oraz artretyczny, a Twoje <strong>stawy i mięśnie będą działały jak w wieku 20 lat</strong>. Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły odbudowującej stawy i mięśnie – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 45. roku życia.`)}
      </p>
    `,
            a = c `
      <p>
        ${n("U osób po 30. roku życia procesy regeneracyjne mieszków włosowych bywają zablokowane do tego stopnia, że potrzeba naprawdę silnej broni, aby zatrzymać nadmierne wypadanie włosów, a tym bardziej łysienie...")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ przejdziesz metamorfozę marzeń bez względu na Twój wiek. Wzmocnisz włosy, zagęścisz, cofniesz łysienie i <strong>będziesz miał 100% włosów więcej</strong>. Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły hamującej wypadanie włosów – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie osobom po 30. roku życia.`)}
      </p>
    `,
            r = c `
      <p>
        ${n("U kobiet malujących rzęsy, doklejających sztuczne lub przedłużających je u kosmetyczki dochodzi do nadmiernego osłabienia włosków, łamania ich, a nawet ich masowego wypadania i potrzeba naprawdę silnej broni, żeby to zatrzymać...")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ przejdziesz metamorfozę marzeń bez względu na to w jakiej kondycji są Twoje rzęsy. Wydłużysz je, zagęścisz, przyciemnisz i <strong>będą nawet 2 cm dłuższe</strong>. Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły wydłużającej rzęsy – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie kobietom, które chcą mieć piękne rzęsy bez malowania i doklejania.`)}
      </p>
    `,
            s = c `
      <p>
        ${n("U 98,6% mężczyzn po 50. roku życia dochodzi do problemów z prostatą i potrzeba naprawdę silnej broni, by odwrócić te niebezpieczne zmiany i zachować męskość.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoja prostata znowu będzie działać prawidłowo. Przestaniesz ciągle odwiedzać toaletę i oddawać mocz po kropelce, powróci prawidłowa erekcja, a Twoja <strong>prostata będzie działać jak w wieku 20 lat</strong>. Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły regulującej pracę prostaty – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla mężczyzn po 50. roku życia.`)}
      </p>
    `,
            l = c `
      <p>
        ${n("U mężczyzn po 35. roku życia dochodzi do problemów z potencją i potrzeba naprawdę silnej broni, by odwrócić te niebezpieczne zmiany i zachować męskość.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoje libido znowu wystrzeli w kosmos. Twoje wzwody będą twarde, erekcje długie, orgazmy intensywne, a Twoja <strong>potencja będzie tak wysoka jak w wieku 18 lat</strong>. Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły wzmagającej potencję – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla mężczyzn po 35. roku życia.`)}
      </p>
    `,
            d = c `
      <p>
        ${n("U osób po 45. roku życia dochodzi do zmian w tkankach układu krwionośnego, a proces regeneracji bywa zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by odwrócić te niebezpieczne zmiany i przywrócić pełną sprawność.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ zregenerujesz swoje serce i układ krążenia w 100%, bez względu na Twój wiek. Udrożnisz tętnice, zyskasz prawidłowe krążenie i ciśnienie. <strong>Zyskasz przynajmniej 3 razy więcej energii</strong>. Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły cardio-fenalnej – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie osobom po 45. roku życia.
          `)}
      </p>
    `,
            u = c `
      <p>
        ${n("U osób po 35. roku życia proces regeneracji komórkowej bywa znacznie spowolniony, a często po prostu zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by zacząć zwalczać zakażenia bakteryjne, grzybicze i inne.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoje paznokcie znowu będą gładkie, lśniące i piękne bez względu na Twój wiek. Pozbędziesz się różnego rodzaju grzybów, a do tego odżywisz, zregenerujesz i <strong>upiększysz paznokcie w 14 dni</strong>. Szybciej i łatwej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły zwalczającej grzybicę paznokci – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 35. roku życia.`)}
      </p>
    `,
            w = c `
      <p>
        ${n("U osób po 35. roku życia proces naprawy dermatoz bywa znacznie spowolniony, a często po prostu zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by zacząć zwalczać problemy skórne.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoja skóra będzie zdrowa, gładka, ładna i odporna na dermatozy bez względu na Twój wiek. Pozbędziesz się szpecących zmian, świądu, pieczenia, a do tego odzyskasz wiarę w siebie i <strong>zlikwidujesz ograniczenia w 21 dni</strong>. Szybciej i łatwej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły zwalczającej problemy skórne – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 35. roku życia.`)}
      </p>
    `,
            p = c `
      <p>
        ${n("U osób po 35. roku życia proces przywracania właściwej cyrkulacji krwi bywa znacznie spowolniony, a często po prostu zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by zacząć likwidację żylaków.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoje nogi odzyskają ładny wygląd, bez plątaniny ciemnych, obrzmiałych żył bez względu na Twój wiek. <strong>Pozbędziesz się uczucia ciężkości nóg, bólu, drętwienia i mrowienia, opuchlizny, a przede wszystkim żylaków już wkrótce.</strong> Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły likwidującej żylaki – <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 35. roku życia.`)}
      </p>
    `,
            b = c `
      <p>
        ${n("U osób po 35. roku życia proces regeneracji komórkowej bywa znacznie spowolniony, a często po prostu zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by zacząć zwalczać hiperkeratozę, czyli nadmierne rogowacenie w obrębie pięt i bocznych krawędzi stóp.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoje pięty znowu będą gładkie, elastyczne i dobrze nawilżone bez względu na Twój wiek. <strong>Pozbędziesz się problemu rogowaciejącej, suchej, pękającej skóry, zregenerujesz i upiększysz stopy w 14 dni.</strong> Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły zwalczającej hiperkeratozę - <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 35. roku życia.`)}
      </p>
    `,
            z = c `
      <p>
        ${n("U osób po 35. roku życia proces regeneracji komórkowej bywa znacznie spowolniony, a często po prostu zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by odwrócić obumieranie komórek słuchowych i nie tylko zatrzymać to, ale sprawić, by słuch funkcjonował prawidłowo i każdy dźwięk z otoczenia docierał do Ciebie.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twój słuch będzie funkcjonował bez zarzutu bez względu na Twój wiek.<strong> Pozbędziesz się problemu złego rozumienia mowy, proszenia o powtórzenie, pisków, szumów i brzęczenia w uszach w kilka chwil.</strong> Szybciej i łatwej niż przypuszczasz!
          `)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły naturalnie przywracającej słuch - <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 35. roku życia.`)}
      </p>
    `,
            P = c `
      <p>
        ${n("U osób po 35. roku życia proces regeneracji komórkowej bywa znacznie spowolniony, a często po prostu zablokowany do tego stopnia, że potrzeba naprawdę silnej broni, by odwrócić zmniejszanie objętości ust i nie tylko zatrzymać to, ale sprawić, by usta były pełne, dobrze nawilżone i piękne.")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ Twoje usta będą pełne i ponętne bez względu na Twój wiek. <strong>Pozbędziesz się problemu wąskich, bladych i spierzchniętych warg w kilka chwil.</strong> Szybciej i łatwej niż przypuszczasz!
    `)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły naturalnie powiększającej usta - <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie dla osób po 35. roku życia.`)}
      </p>
    `,
            M = c `
      <p>
        ${n("U kobiet malujących paznokcie lakierem, stosujących hybrydę, żel, akryl lub doklejających tipsy dochodzi do nadmiernego osłabienia płytki paznokcia, w wyniku czego dochodzi do łamania, rozdwajania, osłabienia, przebarwień i potrzeba naprawdę silnej broni, żeby to zatrzymać...")}
      </p>
      <p>
        ${n(c`Jednak nie martw się, ponieważ przejdziesz metamorfozę marzeń bez względu na to w jakiej kondycji są Twoje paznokcie. Wzmocnisz je, <strong>będą twarde i odporne na uszkodzenia, nawet te mechaniczne, a do tego piękne i błyszczące</strong> jak po japońskim manicure. Szybciej i łatwiej niż przypuszczasz!`)}
      </p>
      <p>
        ${n(c`Jedyna rzecz, jakiej teraz potrzebujesz, to większa ilość super-skutecznej formuły naprawiającej paznokcie - <strong>i możesz zdobyć ją taniej</strong>. Dlatego wybierz wzmocnioną wersję kuracji, dedykowaną specjalnie kobietom, które chcą mieć piękne, mocne i zdrowe paznokcie.`)}
      </p>
    `;
        return c `
      <adm-page>
        ${this._config.flow==="react"?c` ${n("Uwaga!")} `:c` ${n("Zanim przejdziesz do kolejnego kroku...")} `}

        <div slot="body" class="special">
          ${this._config.flow==="react"?c`
                <h2 class="special__subtitle">
                  <strong>${n("Masz tu jeszcze lepszą ofertę")}</strong>
                </h2>
              `:c`
                <h2 class="special__subtitle">
                  ${n("...odpowiedz na jedno ważne pytanie:")}
                  <br />
                  <strong> ${this._getTheSubtitle()} </strong>
                  <br />

                  ${n("Jeśli Twoja odpowiedź brzmi „TAK” – koniecznie czytaj dalej:")}
                </h2>
              `}
          ${this._config.flow==="react"?c`
                <p>
                  ${n(c`Proszę przeczytaj uważnie: tylko kilka osób może zobaczyć tę stronę, w tym Ty. Wszystko dlatego, że w Twoim regionie dostępnych jest <strong>10 dodatkowych opcji dofinansowania zakupu</strong> kuracji, którą stosujesz. <strong>MOŻESZ SKORZYSTAĆ Z TEJ OKAZJI JUŻ TERAZ</strong> – ale pamiętaj, że to jednorazowa akcja i do tego ograniczona w czasie.`)}
                </p>

                <p class="special__cta special__cta--red">
                  ${n("Kto najbardziej skorzysta z tej specjalnej oferty?")}
                </p>

                <p>
                  ${n(c`Wiesz już, że kończysz 1. etap kuracji, który wystarczy kontynuować, aby nie stracić osiągniętych efektów i nie zmarnować swojej ciężkiej pracy. Wybierając proponowaną Ci ofertę specjalną, osiągniesz <strong>2 razy silniejsze i szybsze efekty</strong> – a ponieważ masz dodatkowe środki, zrobisz to jak najniższym kosztem.`)}
                </p>

                <p>
                  ${n(c`Wykorzystaj przewagę z tej specjalnej oferty oraz proponowane dofinansowanie już teraz i uzyskaj pełną gwarancję efektów.`)}
                </p>

                <p class="special__cta">${n("Dlaczego warto?")}</p>
              `:c`
                ${this._config.category==="slim"?e:m}
                ${this._config.category==="wrinkles"?o:m}
                ${this._config.category==="joints"?i:m}
                ${this._config.category==="hair"?a:m}
                ${this._config.category==="eyelashes"?r:m}
                ${this._config.category==="urology"?s:m}
                ${this._config.category==="potency"?l:m}
                ${this._config.category==="cardio"?d:m}
                ${this._config.category==="mycosis"?u:m}
                ${this._config.category==="cbd"?w:m}
                ${this._config.category==="veins"?p:m}
                ${this._config.category==="feet"?b:m}
                ${this._config.category==="lips"?P:m}
                ${this._config.category==="oil"?z:m}
                ${this._config.category==="nails"?M:m}
                ${this._config.flow==="insert"||this._config.flow==="xsell"||this._config.flow==="react"?c`
                      <p>
                        ${n(c`Dostępność wzmocnionej wersji kuracji to ${this._product.size*2} ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")} w niesamowicie niskiej cenie – ${this._getPrice("after")}. Ta formuła <strong>już nigdy nie będzie dostępna w tak korzystnej ofercie</strong>. Po wysłaniu 100 sztuk, cena wróci do ${this._getPrice("before")}.`)}
                      </p>
                    `:c`
                      ${this._config.language==="pl"||this._config.language==="cs"||this._config.language==="es"||this._config.language==="hr"||this._config.language==="hu"||this._config.language==="it"||this._config.language==="sk"?c`
                            <p>
                              ${n(c`Dostępność wzmocnionej wersji kuracji to ${this._product.size*2} ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")} w niesamowitym pakiecie! Za ${this._getPrice("after")} otrzymasz 1 DUŻE opakowanie, e-book <i>"${jt(y())}"</i> oraz voucher na ${x(this._product.price,y()).voucherUpsellPrice} na kolejne zakupy w sklepie online! Ta formuła <strong>już nigdy nie będzie dostępna w tak korzystnej ofercie</strong>. Po wysłaniu 100 sztuk, cena wróci do ${this._getPrice("before")}.`)}
                            </p>
                          `:c`
                            <p>
                              ${n(c`Dostępność wzmocnionej wersji kuracji to ${this._product.size*2} ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")} w niesamowitym pakiecie! Za ${this._getPrice("after")} otrzymasz 1 DUŻE opakowanie oraz voucher na ${x(this._product.price,y()).voucherUpsellPrice} na kolejne zakupy w sklepie online! Ta formuła <strong>już nigdy nie będzie dostępna w tak korzystnej ofercie</strong>. Po wysłaniu 100 sztuk, cena wróci do ${this._getPrice("before")}.`)}
                            </p>
                          `}
                    `}

                <p class="special__cta">
                  ${n("Dlaczego to się tak bardzo opłaca?")}
                </p>
              `}

          <div class="special__table">
            <div class="special__empty"></div>
            <div class="special__header">${n("Oferta regularna")}</div>
            <div class="special__header special__header--special">
              ${n("Oferta specjalna")}
            </div>
            <div class="special__row">
              ${this._config.flow==="react"?c` ${n("4 małe opakowania kuracji")} `:c` ${n("2 małe opakowania")} `}
            </div>
            <div class="special__row special__row--special">
              ${this._config.flow==="react"?c` ${n("2 duże opakowania kuracji")} `:c`
                    ${this._config.flow==="insert"||this._config.flow==="xsell"?c`${n("1 DUŻE opakowanie")}`:this._config.language==="pl"||this._config.language==="cs"||this._config.language==="es"||this._config.language==="hr"||this._config.language==="hu"||this._config.language==="it"||this._config.language==="sk"?c`${n("1 DUŻE opakowanie + e-book + voucher")}`:c`${n("1 DUŻE opakowanie + voucher")} `}
                  `}
            </div>
            <div
              class="${this._config.flow==="react"?"special__row special__row--react":"special__row special__row--image"}"
            >
              ${this._config.flow==="react"?c`
                    <div>
                      <img
                        .src="${this._getPackshotURL("small")}"
                        alt="Packshot"
                        class="special__packshot"
                      />
                    </div>
                    <div>
                      <img
                        .src="${this._getPackshotURL("small")}"
                        alt="Packshot"
                        class="special__packshot"
                      />
                    </div>
                    <div>
                      <img
                        .src="${this._getPackshotURL("small")}"
                        alt="Packshot"
                        class="special__packshot"
                      />
                    </div>
                    <div>
                      <img
                        .src="${this._getPackshotURL("small")}"
                        alt="Packshot"
                        class="special__packshot"
                      />
                    </div>
                  `:c`
                    <img
                      .src="${this._getPackshotURL("small")}"
                      alt="Packshot"
                      class="special__packshot"
                    />
                    <img
                      .src="${this._getPackshotURL("small")}"
                      alt="Packshot"
                      class="special__packshot"
                    />
                  `}
            </div>
            <div
              class="${this._config.flow==="react"?"special__row special__row--react special__row--special":(this._config.language==="pl"||this._config.language==="cs"||this._config.language==="es"||this._config.language==="hr"||this._config.language==="hu"||this._config.language==="it"||this._config.language==="sk","special__row special__row--image special__row--special")}"
            >
              ${this._config.flow==="react"?c`
                    <div>
                      <img
                        .src="${this._getPackshotURL("big")}"
                        alt="Packshot"
                        class="special__packshot"
                      />
                    </div>
                    <div>
                      <img
                        .src="${this._getPackshotURL("big")}"
                        alt="Packshot"
                        class="special__packshot"
                      />
                    </div>
                  `:this._config.flow==="insert"||this._config.flow==="xsell"?c`<img
                      .src="${this._getPackshotURL("big")}"
                      alt="Packshot"
                    />`:this._config.language==="pl"||this._config.language==="cs"||this._config.language==="es"||this._config.language==="hr"||this._config.language==="hu"||this._config.language==="it"||this._config.language==="sk"?c`
                        <img
                          .src="${this._getPackshotURL("big")}"
                          alt="Packshot"
                        />
                        <div class="special__pack">
                          <img
                            class="special__pack--ebook"
                            .src="${H("img","ebook.png",y())}"
                            alt="Packshot"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <img
                            class="special__pack--voucher"
                            .src="${H("img","voucher.png")}"
                            alt="Packshot"
                          />
                        </div>
                      `:c`
                        <img
                          .src="${this._getPackshotURL("big")}"
                          alt="Packshot"
                          class="special__packshot"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <img
                          class="special__voucher"
                          .src="${H("img","voucher.png")}"
                          alt="Packshot"
                        />
                      `}
            </div>
            <div class="special__divider">
              <span>${n("Opakowanie")}</span>
            </div>
            <div class="special__row">
              ${this._config.flow==="react"?c`
                    4 &times; ${this._product.size}
                    ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}
                    = ${this._product.size*4}
                    ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}
                  `:c`
                    2 &times; ${this._product.size}
                    ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}
                    = ${this._product.size*2}
                    ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}
                  `}
            </div>
            <div class="special__row special__row--special">
              ${this._config.flow==="react"?c`
                    2 &times; ${this._product.size*2}
                    ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}
                    = ${this._product.size*4}
                    ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}
                  `:c`
                    ${this._product.size*2}
                    ${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}
                  `}
            </div>
            <div class="special__divider">
              <span>${n("Wysyłka")}</span>
            </div>
            <div class="special__row">
              ${x(this._product.price,y()).deliveryPrice}
            </div>
            <div class="special__row special__row--special">
              <span class="uppercase">${n("Gratis!")}</span>
            </div>
            <div class="special__divider">
              <span>${n("Razem")}</span>
            </div>
            <div class="special__row special__row--last">
              ${this._getPrice("before")}
            </div>
            <div class="special__row special__row--last special__row--special">
              ${this._getPrice("after")}
            </div>
          </div>
          <p class="special__cta">
            ${this._config.flow==="react"?n("Wybierz specjalną wersję, dzięki, której dostajesz więcej za mniej i uzyskaj pełną gwarancję wyników."):n("Zamień małe opakowanie na duże, które się bardziej opłaca!")}
          </p>
          <button class="special__btn" @click=${this._handleUpsell}>
            <span class="special__btn--front">
              <span>
                ${this._config.flow==="react"?n("TAK, wybieram SPECJALNĄ ofertę!"):n("TAK, wybieram wersję wzmocnioną i oszczędzam")}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                />
              </svg>
            </span>
          </button>
          <div class="special__end">
            <button @click=${this._handleCancel}>
              ${this._config.flow==="react"?n("Nie, dziękuję. Nie potrzebuję lepszych wyników"):n("Nie, dziękuję. Nie chcę skorzystać z okazji")}
            </button>
          </div>
        </div>
      </adm-page>
    `
    }
    _getTheSubtitle() {
        switch (this._config.category) {
            case "slim":
            case "potency":
            case "mycosis":
            case "cbd":
            case "veins":
            case "feet":
            case "lips":
            case "oil":
                return c `${n("Czy masz więcej niż 35 lat?")}`;
            case "wrinkles":
                return c `${n("Czy masz więcej niż 40 lat?")}`;
            case "joints":
            case "cardio":
                return c `${n("Czy masz więcej niż 45 lat?")}`;
            case "hair":
                return c `${n("Czy masz więcej niż 30 lat?")}`;
            case "eyelashes":
                return c `${n("Czy przynajmniej raz w tygodniu malujesz rzęsy?")}`;
            case "urology":
                return c `${n("Czy masz więcej niż 50 lat?")}`;
            case "nails":
                return c `${n("Czy raz na jakiś czas malujesz paznokcie lakierem lub hybrydą?")}`;
            default:
                return m
        }
    }
    _handleUpsell() {
        var e, o;
        this._btn.disabled = !0, G.url(`orders/${(e=v())===null||e===void 0?void 0:e.order_id}`).put({
            order: {
                offer_code: `${this._config.offerCode}${((o=v())===null||o===void 0?void 0:o.promo)===!0||this._config.flow==="or"?"4":"2"}${Y(this._config.market)}`
            }
        }).json().then(i => {
            var a;
            if (W({
                    upsell: !0
                }), this._config.confirm) return ae("confirmation"), i;
            const r = (a = v()) === null || a === void 0 ? void 0 : a.payment_link;
            return r && r !== "" ? (window.location.assign(r), i) : (window.location.assign(this._getThankYouPage()), i)
        }).catch(() => {
            this._btn.disabled = !1
        })
    }
    _handleCancel() {
        var e, o;
        if (this._config.confirm) {
            ae("confirmation");
            return
        }
        if (((e = v()) === null || e === void 0 ? void 0 : e.payment_link) !== "") {
            const i = (o = v()) === null || o === void 0 ? void 0 : o.payment_link;
            i && i !== "" && window.location.assign(i)
        } else window.location.assign(this._getThankYouPage())
    }
    _getThankYouPage() {
        if (this._config.typ !== "") {
            const e = new URL(this._config.typ),
                o = _e();
            return o ? (e.search === "" ? e.search = "?" + o : e.search += "&" + o, e.toString()) : this._config.typ
        }
        return Ie("thank-you")
    }
    _getPrice(e) {
        var o;
        return e === "before" ? x(this._product.price, y()).upsellBeforePrice : ((o = v()) === null || o === void 0 ? void 0 : o.promo) === !0 || this._config.flow === "or" ? x(this._product.price, y()).promoUpsellAfterPrice : x(this._product.price, y()).upsellAfterPrice
    }
    _getPackshotURL(e) {
        const o = this._config.offerCode.slice(0, -1).toLowerCase();
        return H("packshots", `${o}-${e}.png`)
    }
};
ot.styles = [j.styles, L `
      .special__subtitle {
        font-size: 1rem;
        font-weight: 400;
        margin-bottom: 1rem;
        line-height: 1.75;
        text-align: center;
      }
      .special__subtitle strong {
        font-size: 1.125rem;
        font-weight: 700;
      }
      .special__cta {
        text-align: center;
        font-size: 1.125rem;
        font-weight: 700;
        margin: 1.5rem 0;
      }
      .special__cta--red {
        color: var(--adm-red-700);
      }
      p {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
      .special__table {
        display: grid;
        margin: 1.5rem 0;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .special__header {
        border: 1px solid var(--adm-gray-300);
        background-color: var(--adm-gray-50);
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        border-bottom-width: 0;
        text-align: center;
        text-transform: uppercase;
        font-size: 0.875rem;
        font-weight: 700;
        padding: 0.5rem 0.75rem;
      }
      .special__header--special {
        border-color: #2bad57;
        background-color: #2bad57;
        color: #ffffff;
      }
      .special__row {
        border: 1px solid var(--adm-gray-300);
        background-color: var(--adm-gray-50);
        text-align: center;
        padding: 0.75rem 0.75rem;
      }
      .special__row--last {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
      .special__row--special {
        border-color: #2bad57;
        background-color: #ecfef2;
        font-weight: 700;
      }
      .special__row--image {
        display: flex;
        border-top-width: 0;
        align-items: center;
        justify-items: center;
      }
      .special__row--react {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
      }
      .special__row--react.special__row--special {
        grid-template-rows: none;
        align-items: center;
      }
      .special__row--image .special__packshot {
        display: block;
        width: 50%;
        max-width: 8rem;
        height: auto;
        margin: 0 auto;
        flex-shrink: 0;
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
        opacity: 0.8;
      }
      .special__row--react .special__packshot {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
        opacity: 0.8;
      }
      .special__row--image.special__row--special {
        flex-direction: column;
      }
      .special__pack {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }
      .special__pack--ebook {
        flex-shrink: 0;
        width: calc(40% - 1rem);
      }
      .special__pack--voucher {
        flex-shrink: 0;
        width: calc(60% - 1rem);
      }
      .special__voucher {
        width: 100%;
        max-width: 100px !important;
        margin: 0 auto;
      }
      .special__row--image.special__row--special .special__packshot {
        width: 100%;
        max-width: 16rem;
        -webkit-filter: none;
        filter: none;
        opacity: 1;
      }
      .special__row--react.special__row--special .special__packshot {
        -webkit-filter: none;
        filter: none;
        opacity: 1;
      }
      .special__row--image.special__row--special svg {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        fill: #2bad57;
        margin-bottom: 0.5rem;
        flex: 1 0 auto;
      }
      .special__divider {
        text-align: center;
        text-transform: uppercase;
        font-size: 0.875rem;
        padding: 0.5rem 0;
        position: relative;
        grid-column: span 2 / span 2;
      }
      .special__divider::before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: var(--adm-gray-500);
        position: absolute;
        top: calc(50% - 0.5px);
        left: 0;
      }
      .special__divider span {
        display: inline-block;
        background-color: #ffffff;
        padding: 0 0.5rem;
        position: relative;
        z-index: 10;
      }
      .uppercase {
        text-transform: uppercase;
      }
      .special__empty {
        display: none;
      }
      .special__btn {
        display: block;
        max-width: 36rem;
        border: none;
        border-radius: 0.5rem;
        background-color: #1e7b3e;
        padding: 0;
        margin: 2rem auto 1.5rem;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        cursor: pointer;
      }
      .special__btn:disabled {
        background-color: var(--adm-gray-300) !important;
        cursor: not-allowed;
      }

      .special__btn .special__btn--front {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        border-radius: 0.5rem;
        width: 100%;
        padding: 0.75rem 1rem;
        background-color: #2bad57;
        transform: translateY(-4px);
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }

      .special__btn:disabled .special__btn--front {
        background-color: var(--adm-gray-200) !important;
        color: var(--adm-gray-500) !important;
      }
      .special__btn:hover .special__btn--front {
        background-color: #2aa553;
      }
      .special__btn:active .special__btn--front {
        transform: translateY(-1px);
      }
      .special__btn .special__btn--front span {
        color: #ffffff;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 700;
      }
      .special__btn svg {
        display: inline-block;
        fill: #ffffff;
        width: 1.75rem;
        height: 1.75rem;
        margin-left: 0.25rem;
        flex-shrink: 0;
      }
      .special__end {
        text-align: center;
        margin-bottom: 3rem;
      }
      .special__end button {
        border: 0;
        padding: 0;
        background-color: var(--adm-gray-200);
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        color: var(--adm-gray-500);
        font-size: 1rem;
      }
      @media (min-width: 768px) {
        .special__subtitle {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }
        .special__subtitle strong {
          font-size: 1.5rem;
        }
        .special__cta {
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
        p {
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        .special__table {
          grid-template-columns: repeat(10, minmax(0, 1fr));
        }
        .special__header {
          border-bottom-width: 1px;
        }
        .special__empty {
          display: block;
          grid-column: span 2 / span 2;
          grid-row: span 3 / span 3;
        }
        .special__divider {
          font-size: 1rem;
          padding: 0.75rem;
          grid-column: auto;
          text-align: right;
          text-transform: none;
          grid-column: 1 / span 2;
        }
        .special__divider::before {
          content: none;
        }
        .special__divider span {
          padding: 0;
          background-color: transparent;
        }
        .special__divider span::after {
          content: ':';
        }
        .special__row,
        .special__header {
          grid-column: span 3 / span 3;
        }
        .special__row {
          border-top-width: 0;
        }
        .special__end button {
          padding: 0.75rem 2rem;
        }
      }
    `];
ai([U(".special__btn")], ot.prototype, "_btn", void 0);
ot = ai([I("adm-special"), q()], ot);
var Ga = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let $t = class extends j {
    render() {
        var e, o, i, a, r;
        return c `
      <adm-page color="neutral">
        ${n("Dziękujemy!")}
        <div slot="body" class="typ">
          <p>${n("Drogi Kliencie,")}</p>
          <p>
            ${n("dziękujemy za zaufanie i wybór naszych produktów. Mamy nadzieję, że przyniosą Ci wiele satysfakcji. Już wkrótce zobaczysz wymarzone efekty!")}
          </p>
          <p>
            ${n("W ciągu kilku dni roboczych otrzymasz przesyłkę ze swoim zamówieniem.")}
          </p>
          <h2 class="typ__subtitle">${n("Szczegóły zamówienia:")}</h2>
          <div class="typ__wrapper">
            <div
              class="${this._config.flow==="insert"||this._config.flow==="xsell"||this._config.flow==="react"?"typ__product typ__product--insert":"typ__product"}"
            >
              ${this._config.flow==="insert"||this._config.flow==="xsell"?c`
                    <img
                      .src="${this._getPackshotURL("small")}"
                      alt="Packshot"
                    />
                    <img
                      .src="${this._getPackshotURL("small")}"
                      alt="Packshot"
                    />
                  `:this._config.flow==="react"?c`
                      <img
                        .src="${!((e=v())===null||e===void 0)&&e.upsell?this._getPackshotURL("big"):this._getPackshotURL("small")}"
                      />
                      <img
                        .src="${!((o=v())===null||o===void 0)&&o.upsell?this._getPackshotURL("big"):this._getPackshotURL("small")}"
                      />
                    `:c`
                      <img
                        .src="${!((i=v())===null||i===void 0)&&i.upsell?this._getPackshotURL("big"):this._getPackshotURL("small")}"
                        alt="Packshot"
                      />
                    `}
            </div>
            <div class="typ__details">
              <p>
                <strong>${this._product.name}</strong>
              </p>
              <p>
                ${n("Liczba opakowań:")}
                ${this._config.flow==="insert"||this._config.flow==="xsell"?c`
                      <span
                        >2x${this._product.size}&nbsp;${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}</span
                      >
                    `:this._config.flow==="react"?c` <span
                        >2x${!((a=v())===null||a===void 0)&&a.upsell?this._product.size*2:this._product.size}&nbsp;${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}</span
                      >`:c`
                        <span
                          >1x${!((r=v())===null||r===void 0)&&r.upsell?this._product.size*2:this._product.size}&nbsp;${this._product.unit==="ml"?"ml":this._product.unit==="g"?"g":n("szt.")}</span
                        >
                      `}
              </p>
              <p>
                ${n("Całkowita wartość zamówienia:")}
                <span>${this._getStepPrice()}</span>
              </p>
            </div>
          </div>
          <p>
            ${n("Dołożymy wszelkich starań, aby przesyłka dotarła do Ciebie jak najszybciej.")}
          </p>
          <footer class="typ__footer">
            <p>${n("Serdeczne pozdrowienia!")}</p>
            <div class="typ__signature">
              <img
                .src="${H("signature","signature.svg",y())}"
                alt="${n("Waldemar Skalski")}"
              />
            </div>
            <p>
              ${n("Waldemar Skalski")}
              <br />
              ${n("Zespół Obsługi Klienta")}
            </p>
          </footer>
        </div>
      </adm-page>
    `
    }
    _getStepPrice() {
        var e, o, i, a, r;
        return ((e = v()) === null || e === void 0 ? void 0 : e.promo) === !0 && ((o = v()) === null || o === void 0 ? void 0 : o.upsell) === !0 ? x(this._product.price, y()).promoUpsellAfterPrice : ((i = v()) === null || i === void 0 ? void 0 : i.upsell) === !0 && this._config.flow === "or" ? x(this._product.price, y()).promoUpsellAfterPrice : ((a = v()) === null || a === void 0 ? void 0 : a.upsell) === !0 ? x(this._product.price, y()).upsellAfterPrice : this._config.flow === "or" ? x(this._product.price, y()).promoPrice : ((r = v()) === null || r === void 0 ? void 0 : r.promo) === !0 ? x(this._product.price, y()).promoPrice : x(this._product.price, y()).standardAfterPrice
    }
    _getPackshotURL(e) {
        const o = this._config.offerCode.slice(0, -1).toLowerCase();
        return H("packshots", `${o}-${e}.png`)
    }
};
$t.styles = [j.styles, L `
      p {
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }
      .typ__subtitle {
        text-align: center;
        font-size: 1.125rem;
        margin-top: 1.5rem;
      }
      .typ__product {
        border-radius: 0.5rem;
        background-color: var(--adm-gray-50);
        padding: 1rem;
        margin: 1.5rem 0 1rem;
      }
      .typ__product--insert {
        position: relative;
      }
      .typ__product img {
        display: block;
        margin: 0 auto;
        max-height: 15rem;
      }
      .typ__product--insert img {
        position: relative;
        top: 0.5rem;
        left: 0.75rem;
        z-index: 10;
        max-height: 15rem;
      }
      .typ__product--insert img + img {
        position: absolute;
        top: calc(50% - 7.5rem - 0.5rem);
        left: calc(50% - 7.5rem - 0.75rem);
        z-index: 1;
      }
      .typ__details {
        margin-bottom: 2rem;
      }
      .typ__details p {
        font-size: 0.875rem;
        margin-bottom: 0.75rem;
      }
      .typ__footer {
        margin-top: 1.5rem;
      }
      .typ__signature {
        display: inline-block;
        margin: 0.5rem 0;
      }
      .typ__signature img {
        display: block;
        margin: 0 auto;
        max-height: 5rem;
      }
      @media (min-width: 768px) {
        .typ__subtitle {
          font-size: 1.25rem;
        }
        .typ__wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .typ__details {
          margin-bottom: 0;
          margin-left: 1rem;
        }
        .typ__details p {
          margin-bottom: 1rem;
        }
        .typ__details p:last-child {
          margin-bottom: 0;
        }
        .typ__footer {
          margin-top: 2rem;
          text-align: right;
        }
      }
    `];
$t = Ga([I("adm-typ"), q()], $t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mo = (t, e, o) => {
        const i = new Map;
        for (let a = e; a <= o; a++) i.set(t[a], a);
        return i
    },
    Qa = nt(class extends rt {
        constructor(t) {
            if (super(t), t.type !== X.CHILD) throw Error("repeat() can only be used in text expressions")
        }
        dt(t, e, o) {
            let i;
            o === void 0 ? o = e : e !== void 0 && (i = e);
            const a = [],
                r = [];
            let s = 0;
            for (const l of t) a[s] = i ? i(l, s) : s, r[s] = o(l, s), s++;
            return {
                values: r,
                keys: a
            }
        }
        render(t, e, o) {
            return this.dt(t, e, o).values
        }
        update(t, [e, o, i]) {
            const a = Na(t),
                {
                    values: r,
                    keys: s
                } = this.dt(e, o, i);
            if (!Array.isArray(a)) return this.ut = s, r;
            const l = this.ut ? ? (this.ut = []),
                d = [];
            let u, w, p = 0,
                b = a.length - 1,
                z = 0,
                P = r.length - 1;
            for (; p <= b && z <= P;)
                if (a[p] === null) p++;
                else if (a[b] === null) b--;
            else if (l[p] === s[z]) d[z] = re(a[p], r[z]), p++, z++;
            else if (l[b] === s[P]) d[P] = re(a[b], r[P]), b--, P--;
            else if (l[p] === s[P]) d[P] = re(a[p], r[P]), $e(t, d[P + 1], a[p]), p++, P--;
            else if (l[b] === s[z]) d[z] = re(a[b], r[z]), $e(t, a[p], a[b]), b--, z++;
            else if (u === void 0 && (u = mo(s, z, P), w = mo(l, p, b)), u.has(l[p]))
                if (u.has(l[b])) {
                    const M = w.get(s[z]),
                        S = M !== void 0 ? a[M] : null;
                    if (S === null) {
                        const He = $e(t, a[p]);
                        re(He, r[z]), d[z] = He
                    } else d[z] = re(S, r[z]), $e(t, a[p], S), a[M] = null;
                    z++
                } else ft(a[b]), b--;
            else ft(a[p]), p++;
            for (; z <= P;) {
                const M = $e(t, d[P + 1]);
                re(M, r[z]), d[z++] = M
            }
            for (; p <= b;) {
                const M = a[p++];
                M !== null && ft(M)
            }
            return this.ut = s, ei(t, d), F
        }
    });
var Ne = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let he = class extends j {
    constructor() {
        super(), this._toastItemsPool = [], this._displayedToastItems = [], this._lastItemAddedAt = performance.now(), this._nextAdditionIn = this._getRandomTime(), this._initializeToastItemsPool(100)
    }
    firstUpdated() {
        this._startDisplayingItems()
    }
    render() {
        return this._config.category !== "potency" ? c `
        <slot>
          ${Qa(this._displayedToastItems,e=>e.id,e=>c`<adm-toast-item
                type=${e.type}
                class="toast--${e.type}"
                ${De({keyframeOptions:{duration:500,easing:"ease-in-out"},in:Ee,out:Ce,stabilizeOut:!0})}
              ></adm-toast-item>`)}
        </slot>
      ` : c ``
    }
    _initializeToastItemsPool(e) {
        const o = ["views", "buys", "reviews"];
        for (let i = 0; i < e; i++) {
            const a = o[Math.floor(Math.random() * o.length)];
            this._toastItemsPool.push({
                id: i,
                type: a,
                addedAt: performance.now()
            })
        }
    }
    _startDisplayingItems() {
        const e = o => {
            if (this._displayedToastItems = this._displayedToastItems.filter(i => o - i.addedAt < 8e3), o - this._lastItemAddedAt >= this._nextAdditionIn)
                if (this._displayedToastItems.length < this._getMaxActiveItems()) {
                    this._toastItemsPool.length === 0 && this._initializeToastItemsPool(100);
                    const i = this._toastItemsPool.shift();
                    if (i) {
                        const a = this._displayedToastItems.some(r => r.type === "views");
                        (i.type !== "views" || !a) && (this._lastItemAddedAt = o, this._nextAdditionIn = this._getRandomTime(), this._displayedToastItems = [...this._displayedToastItems, { ...i,
                            addedAt: o
                        }])
                    }
                } else this._lastItemAddedAt = o, this._nextAdditionIn = this._getRandomTime();
            requestAnimationFrame(e)
        };
        requestAnimationFrame(e)
    }
    _getRandomTime() {
        return Math.random() * (9e3 - 1e3) + 1e3
    }
    _getMaxActiveItems() {
        return window.innerWidth >= 768 ? 3 : 1
    }
};
he.styles = [j.styles, L `
      :host {
        position: fixed;
        z-index: 100;
        pointer-events: none;
        left: 1rem;
        bottom: 1rem;
        right: 1rem;
      }
      slot:not([name]) {
        gap: 1rem;
        display: flex;
        flex-direction: column-reverse;
      }
      ::slotted(*) {
        pointer-events: all;
      }
      @media (min-width: 640px) {
        :host {
          width: 18rem;
          left: auto;
        }
      }
    `];
Ne([E()], he.prototype, "_toastItemsPool", void 0);
Ne([E()], he.prototype, "_displayedToastItems", void 0);
Ne([E()], he.prototype, "_lastItemAddedAt", void 0);
Ne([E()], he.prototype, "_nextAdditionIn", void 0);
he = Ne([I("adm-toast")], he);

function oe(t) {
    const e = Object.prototype.toString.call(t);
    return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : new Date(NaN)
}
const ho = 6e4,
    fo = 525600,
    wo = 43200,
    go = 1440;
let en = {};

function ni() {
    return en
}

function yo(t, e) {
    var l, d, u, w;
    const o = ni(),
        i = (e == null ? void 0 : e.weekStartsOn) ? ? ((d = (l = e == null ? void 0 : e.locale) == null ? void 0 : l.options) == null ? void 0 : d.weekStartsOn) ? ? o.weekStartsOn ? ? ((w = (u = o.locale) == null ? void 0 : u.options) == null ? void 0 : w.weekStartsOn) ? ? 0,
        a = oe(t),
        r = a.getDay(),
        s = (r < i ? 7 : 0) + r - i;
    return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a
}

function zo(t) {
    const e = oe(t),
        o = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
    return o.setUTCFullYear(e.getFullYear()), +t - +o
}

function tn(t, e) {
    const o = oe(t),
        i = oe(e),
        a = o.getTime() - i.getTime();
    return a < 0 ? -1 : a > 0 ? 1 : a
}

function on(t) {
    return e => {
        const i = (t ? Math[t] : Math.trunc)(e);
        return i === 0 ? 0 : i
    }
}
const an = {
        lessThanXSeconds: {
            one: "less than a second",
            other: "less than {{count}} seconds"
        },
        xSeconds: {
            one: "1 second",
            other: "{{count}} seconds"
        },
        halfAMinute: "half a minute",
        lessThanXMinutes: {
            one: "less than a minute",
            other: "less than {{count}} minutes"
        },
        xMinutes: {
            one: "1 minute",
            other: "{{count}} minutes"
        },
        aboutXHours: {
            one: "about 1 hour",
            other: "about {{count}} hours"
        },
        xHours: {
            one: "1 hour",
            other: "{{count}} hours"
        },
        xDays: {
            one: "1 day",
            other: "{{count}} days"
        },
        aboutXWeeks: {
            one: "about 1 week",
            other: "about {{count}} weeks"
        },
        xWeeks: {
            one: "1 week",
            other: "{{count}} weeks"
        },
        aboutXMonths: {
            one: "about 1 month",
            other: "about {{count}} months"
        },
        xMonths: {
            one: "1 month",
            other: "{{count}} months"
        },
        aboutXYears: {
            one: "about 1 year",
            other: "about {{count}} years"
        },
        xYears: {
            one: "1 year",
            other: "{{count}} years"
        },
        overXYears: {
            one: "over 1 year",
            other: "over {{count}} years"
        },
        almostXYears: {
            one: "almost 1 year",
            other: "almost {{count}} years"
        }
    },
    nn = (t, e, o) => {
        let i;
        const a = an[t];
        return typeof a == "string" ? i = a : e === 1 ? i = a.one : i = a.other.replace("{{count}}", e.toString()), o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? "in " + i : i + " ago" : i
    };

function k(t) {
    return (e = {}) => {
        const o = e.width ? String(e.width) : t.defaultWidth;
        return t.formats[o] || t.formats[t.defaultWidth]
    }
}
const rn = {
        full: "EEEE, MMMM do, y",
        long: "MMMM do, y",
        medium: "MMM d, y",
        short: "MM/dd/yyyy"
    },
    sn = {
        full: "h:mm:ss a zzzz",
        long: "h:mm:ss a z",
        medium: "h:mm:ss a",
        short: "h:mm a"
    },
    cn = {
        full: "{{date}} 'at' {{time}}",
        long: "{{date}} 'at' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    },
    ln = {
        date: k({
            formats: rn,
            defaultWidth: "full"
        }),
        time: k({
            formats: sn,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: cn,
            defaultWidth: "full"
        })
    },
    dn = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
    },
    un = (t, e, o, i) => dn[t];

function h(t) {
    return (e, o) => {
        const i = o != null && o.context ? String(o.context) : "standalone";
        let a;
        if (i === "formatting" && t.formattingValues) {
            const s = t.defaultFormattingWidth || t.defaultWidth,
                l = o != null && o.width ? String(o.width) : s;
            a = t.formattingValues[l] || t.formattingValues[s]
        } else {
            const s = t.defaultWidth,
                l = o != null && o.width ? String(o.width) : t.defaultWidth;
            a = t.values[l] || t.values[s]
        }
        const r = t.argumentCallback ? t.argumentCallback(e) : e;
        return a[r]
    }
}
const pn = {
        narrow: ["B", "A"],
        abbreviated: ["BC", "AD"],
        wide: ["Before Christ", "Anno Domini"]
    },
    mn = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
    },
    hn = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    fn = {
        narrow: ["S", "M", "T", "W", "T", "F", "S"],
        short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    wn = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night"
        }
    },
    gn = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night"
        }
    },
    yn = (t, e) => {
        const o = Number(t),
            i = o % 100;
        if (i > 20 || i < 10) switch (i % 10) {
            case 1:
                return o + "st";
            case 2:
                return o + "nd";
            case 3:
                return o + "rd"
        }
        return o + "th"
    },
    zn = {
        ordinalNumber: yn,
        era: h({
            values: pn,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: mn,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: hn,
            defaultWidth: "wide"
        }),
        day: h({
            values: fn,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: wn,
            defaultWidth: "wide",
            formattingValues: gn,
            defaultFormattingWidth: "wide"
        })
    };

function f(t) {
    return (e, o = {}) => {
        const i = o.width,
            a = i && t.matchPatterns[i] || t.matchPatterns[t.defaultMatchWidth],
            r = e.match(a);
        if (!r) return null;
        const s = r[0],
            l = i && t.parsePatterns[i] || t.parsePatterns[t.defaultParseWidth],
            d = Array.isArray(l) ? kn(l, p => p.test(s)) : bn(l, p => p.test(s));
        let u;
        u = t.valueCallback ? t.valueCallback(d) : d, u = o.valueCallback ? o.valueCallback(u) : u;
        const w = e.slice(s.length);
        return {
            value: u,
            rest: w
        }
    }
}

function bn(t, e) {
    for (const o in t)
        if (Object.prototype.hasOwnProperty.call(t, o) && e(t[o])) return o
}

function kn(t, e) {
    for (let o = 0; o < t.length; o++)
        if (e(t[o])) return o
}

function B(t) {
    return (e, o = {}) => {
        const i = e.match(t.matchPattern);
        if (!i) return null;
        const a = i[0],
            r = e.match(t.parsePattern);
        if (!r) return null;
        let s = t.valueCallback ? t.valueCallback(r[0]) : r[0];
        s = o.valueCallback ? o.valueCallback(s) : s;
        const l = e.slice(a.length);
        return {
            value: s,
            rest: l
        }
    }
}
const vn = /^(\d+)(th|st|nd|rd)?/i,
    _n = /\d+/i,
    jn = {
        narrow: /^(b|a)/i,
        abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
        wide: /^(before christ|before common era|anno domini|common era)/i
    },
    $n = {
        any: [/^b/i, /^(a|c)/i]
    },
    Pn = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](th|st|nd|rd)? quarter/i
    },
    Mn = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    Sn = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
        wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
    },
    xn = {
        narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    An = {
        narrow: /^[smtwf]/i,
        short: /^(su|mo|tu|we|th|fr|sa)/i,
        abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
        wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
    },
    Tn = {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    },
    Wn = {
        narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
        any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
    },
    Cn = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i
        }
    },
    En = {
        ordinalNumber: B({
            matchPattern: vn,
            parsePattern: _n,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: jn,
            defaultMatchWidth: "wide",
            parsePatterns: $n,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: Pn,
            defaultMatchWidth: "wide",
            parsePatterns: Mn,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: Sn,
            defaultMatchWidth: "wide",
            parsePatterns: xn,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: An,
            defaultMatchWidth: "wide",
            parsePatterns: Tn,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: Wn,
            defaultMatchWidth: "any",
            parsePatterns: Cn,
            defaultParseWidth: "any"
        })
    },
    Dn = {
        code: "en-US",
        formatDistance: nn,
        formatLong: ln,
        formatRelative: un,
        localize: zn,
        match: En,
        options: {
            weekStartsOn: 0,
            firstWeekContainsDate: 1
        }
    };

function Rn(t, e, o) {
    const i = ni(),
        a = (o == null ? void 0 : o.locale) ? ? i.locale ? ? Dn,
        r = tn(t, e);
    if (isNaN(r)) throw new RangeError("Invalid time value");
    const s = Object.assign({}, o, {
        addSuffix: o == null ? void 0 : o.addSuffix,
        comparison: r
    });
    let l, d;
    r > 0 ? (l = oe(e), d = oe(t)) : (l = oe(t), d = oe(e));
    const u = on((o == null ? void 0 : o.roundingMethod) ? ? "round"),
        w = d.getTime() - l.getTime(),
        p = w / ho,
        b = zo(d) - zo(l),
        z = (w - b) / ho,
        P = o == null ? void 0 : o.unit;
    let M;
    if (P ? M = P : p < 1 ? M = "second" : p < 60 ? M = "minute" : p < go ? M = "hour" : z < wo ? M = "day" : z < fo ? M = "month" : M = "year", M === "second") {
        const S = u(w / 1e3);
        return a.formatDistance("xSeconds", S, s)
    } else if (M === "minute") {
        const S = u(p);
        return a.formatDistance("xMinutes", S, s)
    } else if (M === "hour") {
        const S = u(p / 60);
        return a.formatDistance("xHours", S, s)
    } else if (M === "day") {
        const S = u(z / go);
        return a.formatDistance("xDays", S, s)
    } else if (M === "month") {
        const S = u(z / wo);
        return S === 12 && P !== "month" ? a.formatDistance("xYears", 1, s) : a.formatDistance("xMonths", S, s)
    } else {
        const S = u(z / fo);
        return a.formatDistance("xYears", S, s)
    }
}

function Oe(t, e, o) {
    const i = yo(t, o),
        a = yo(e, o);
    return +i == +a
}
const On = {
        lessThanXSeconds: {
            one: {
                regular: "méně než 1 sekunda",
                past: "před méně než 1 sekundou",
                future: "za méně než 1 sekundu"
            },
            few: {
                regular: "méně než {{count}} sekundy",
                past: "před méně než {{count}} sekundami",
                future: "za méně než {{count}} sekundy"
            },
            many: {
                regular: "méně než {{count}} sekund",
                past: "před méně než {{count}} sekundami",
                future: "za méně než {{count}} sekund"
            }
        },
        xSeconds: {
            one: {
                regular: "1 sekunda",
                past: "před 1 sekundou",
                future: "za 1 sekundu"
            },
            few: {
                regular: "{{count}} sekundy",
                past: "před {{count}} sekundami",
                future: "za {{count}} sekundy"
            },
            many: {
                regular: "{{count}} sekund",
                past: "před {{count}} sekundami",
                future: "za {{count}} sekund"
            }
        },
        halfAMinute: {
            type: "other",
            other: {
                regular: "půl minuty",
                past: "před půl minutou",
                future: "za půl minuty"
            }
        },
        lessThanXMinutes: {
            one: {
                regular: "méně než 1 minuta",
                past: "před méně než 1 minutou",
                future: "za méně než 1 minutu"
            },
            few: {
                regular: "méně než {{count}} minuty",
                past: "před méně než {{count}} minutami",
                future: "za méně než {{count}} minuty"
            },
            many: {
                regular: "méně než {{count}} minut",
                past: "před méně než {{count}} minutami",
                future: "za méně než {{count}} minut"
            }
        },
        xMinutes: {
            one: {
                regular: "1 minuta",
                past: "před 1 minutou",
                future: "za 1 minutu"
            },
            few: {
                regular: "{{count}} minuty",
                past: "před {{count}} minutami",
                future: "za {{count}} minuty"
            },
            many: {
                regular: "{{count}} minut",
                past: "před {{count}} minutami",
                future: "za {{count}} minut"
            }
        },
        aboutXHours: {
            one: {
                regular: "přibližně 1 hodina",
                past: "přibližně před 1 hodinou",
                future: "přibližně za 1 hodinu"
            },
            few: {
                regular: "přibližně {{count}} hodiny",
                past: "přibližně před {{count}} hodinami",
                future: "přibližně za {{count}} hodiny"
            },
            many: {
                regular: "přibližně {{count}} hodin",
                past: "přibližně před {{count}} hodinami",
                future: "přibližně za {{count}} hodin"
            }
        },
        xHours: {
            one: {
                regular: "1 hodina",
                past: "před 1 hodinou",
                future: "za 1 hodinu"
            },
            few: {
                regular: "{{count}} hodiny",
                past: "před {{count}} hodinami",
                future: "za {{count}} hodiny"
            },
            many: {
                regular: "{{count}} hodin",
                past: "před {{count}} hodinami",
                future: "za {{count}} hodin"
            }
        },
        xDays: {
            one: {
                regular: "1 den",
                past: "před 1 dnem",
                future: "za 1 den"
            },
            few: {
                regular: "{{count}} dny",
                past: "před {{count}} dny",
                future: "za {{count}} dny"
            },
            many: {
                regular: "{{count}} dní",
                past: "před {{count}} dny",
                future: "za {{count}} dní"
            }
        },
        aboutXWeeks: {
            one: {
                regular: "přibližně 1 týden",
                past: "přibližně před 1 týdnem",
                future: "přibližně za 1 týden"
            },
            few: {
                regular: "přibližně {{count}} týdny",
                past: "přibližně před {{count}} týdny",
                future: "přibližně za {{count}} týdny"
            },
            many: {
                regular: "přibližně {{count}} týdnů",
                past: "přibližně před {{count}} týdny",
                future: "přibližně za {{count}} týdnů"
            }
        },
        xWeeks: {
            one: {
                regular: "1 týden",
                past: "před 1 týdnem",
                future: "za 1 týden"
            },
            few: {
                regular: "{{count}} týdny",
                past: "před {{count}} týdny",
                future: "za {{count}} týdny"
            },
            many: {
                regular: "{{count}} týdnů",
                past: "před {{count}} týdny",
                future: "za {{count}} týdnů"
            }
        },
        aboutXMonths: {
            one: {
                regular: "přibližně 1 měsíc",
                past: "přibližně před 1 měsícem",
                future: "přibližně za 1 měsíc"
            },
            few: {
                regular: "přibližně {{count}} měsíce",
                past: "přibližně před {{count}} měsíci",
                future: "přibližně za {{count}} měsíce"
            },
            many: {
                regular: "přibližně {{count}} měsíců",
                past: "přibližně před {{count}} měsíci",
                future: "přibližně za {{count}} měsíců"
            }
        },
        xMonths: {
            one: {
                regular: "1 měsíc",
                past: "před 1 měsícem",
                future: "za 1 měsíc"
            },
            few: {
                regular: "{{count}} měsíce",
                past: "před {{count}} měsíci",
                future: "za {{count}} měsíce"
            },
            many: {
                regular: "{{count}} měsíců",
                past: "před {{count}} měsíci",
                future: "za {{count}} měsíců"
            }
        },
        aboutXYears: {
            one: {
                regular: "přibližně 1 rok",
                past: "přibližně před 1 rokem",
                future: "přibližně za 1 rok"
            },
            few: {
                regular: "přibližně {{count}} roky",
                past: "přibližně před {{count}} roky",
                future: "přibližně za {{count}} roky"
            },
            many: {
                regular: "přibližně {{count}} roků",
                past: "přibližně před {{count}} roky",
                future: "přibližně za {{count}} roků"
            }
        },
        xYears: {
            one: {
                regular: "1 rok",
                past: "před 1 rokem",
                future: "za 1 rok"
            },
            few: {
                regular: "{{count}} roky",
                past: "před {{count}} roky",
                future: "za {{count}} roky"
            },
            many: {
                regular: "{{count}} roků",
                past: "před {{count}} roky",
                future: "za {{count}} roků"
            }
        },
        overXYears: {
            one: {
                regular: "více než 1 rok",
                past: "před více než 1 rokem",
                future: "za více než 1 rok"
            },
            few: {
                regular: "více než {{count}} roky",
                past: "před více než {{count}} roky",
                future: "za více než {{count}} roky"
            },
            many: {
                regular: "více než {{count}} roků",
                past: "před více než {{count}} roky",
                future: "za více než {{count}} roků"
            }
        },
        almostXYears: {
            one: {
                regular: "skoro 1 rok",
                past: "skoro před 1 rokem",
                future: "skoro za 1 rok"
            },
            few: {
                regular: "skoro {{count}} roky",
                past: "skoro před {{count}} roky",
                future: "skoro za {{count}} roky"
            },
            many: {
                regular: "skoro {{count}} roků",
                past: "skoro před {{count}} roky",
                future: "skoro za {{count}} roků"
            }
        }
    },
    Ln = (t, e, o) => {
        let i;
        const a = On[t];
        a.type === "other" ? i = a.other : e === 1 ? i = a.one : e > 1 && e < 5 ? i = a.few : i = a.many;
        const r = (o == null ? void 0 : o.addSuffix) === !0,
            s = o == null ? void 0 : o.comparison;
        let l;
        return r && s === -1 ? l = i.past : r && s === 1 ? l = i.future : l = i.regular, l.replace("{{count}}", String(e))
    },
    In = {
        full: "EEEE, d. MMMM yyyy",
        long: "d. MMMM yyyy",
        medium: "d. M. yyyy",
        short: "dd.MM.yyyy"
    },
    Un = {
        full: "H:mm:ss zzzz",
        long: "H:mm:ss z",
        medium: "H:mm:ss",
        short: "H:mm"
    },
    Nn = {
        full: "{{date}} 'v' {{time}}",
        long: "{{date}} 'v' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    },
    Vn = {
        date: k({
            formats: In,
            defaultWidth: "full"
        }),
        time: k({
            formats: Un,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: Nn,
            defaultWidth: "full"
        })
    },
    Fn = ["neděli", "pondělí", "úterý", "středu", "čtvrtek", "pátek", "sobotu"],
    Hn = {
        lastWeek: "'poslední' eeee 've' p",
        yesterday: "'včera v' p",
        today: "'dnes v' p",
        tomorrow: "'zítra v' p",
        nextWeek: t => {
            const e = t.getDay();
            return "'v " + Fn[e] + " o' p"
        },
        other: "P"
    },
    Kn = (t, e) => {
        const o = Hn[t];
        return typeof o == "function" ? o(e) : o
    },
    Bn = {
        narrow: ["př. n. l.", "n. l."],
        abbreviated: ["př. n. l.", "n. l."],
        wide: ["před naším letopočtem", "našeho letopočtu"]
    },
    Jn = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["1. čtvrtletí", "2. čtvrtletí", "3. čtvrtletí", "4. čtvrtletí"],
        wide: ["1. čtvrtletí", "2. čtvrtletí", "3. čtvrtletí", "4. čtvrtletí"]
    },
    qn = {
        narrow: ["L", "Ú", "B", "D", "K", "Č", "Č", "S", "Z", "Ř", "L", "P"],
        abbreviated: ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"],
        wide: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]
    },
    Zn = {
        narrow: ["L", "Ú", "B", "D", "K", "Č", "Č", "S", "Z", "Ř", "L", "P"],
        abbreviated: ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"],
        wide: ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
    },
    Xn = {
        narrow: ["ne", "po", "út", "st", "čt", "pá", "so"],
        short: ["ne", "po", "út", "st", "čt", "pá", "so"],
        abbreviated: ["ned", "pon", "úte", "stř", "čtv", "pát", "sob"],
        wide: ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"]
    },
    Yn = {
        narrow: {
            am: "dop.",
            pm: "odp.",
            midnight: "půlnoc",
            noon: "poledne",
            morning: "ráno",
            afternoon: "odpoledne",
            evening: "večer",
            night: "noc"
        },
        abbreviated: {
            am: "dop.",
            pm: "odp.",
            midnight: "půlnoc",
            noon: "poledne",
            morning: "ráno",
            afternoon: "odpoledne",
            evening: "večer",
            night: "noc"
        },
        wide: {
            am: "dopoledne",
            pm: "odpoledne",
            midnight: "půlnoc",
            noon: "poledne",
            morning: "ráno",
            afternoon: "odpoledne",
            evening: "večer",
            night: "noc"
        }
    },
    Gn = {
        narrow: {
            am: "dop.",
            pm: "odp.",
            midnight: "půlnoc",
            noon: "poledne",
            morning: "ráno",
            afternoon: "odpoledne",
            evening: "večer",
            night: "noc"
        },
        abbreviated: {
            am: "dop.",
            pm: "odp.",
            midnight: "půlnoc",
            noon: "poledne",
            morning: "ráno",
            afternoon: "odpoledne",
            evening: "večer",
            night: "noc"
        },
        wide: {
            am: "dopoledne",
            pm: "odpoledne",
            midnight: "půlnoc",
            noon: "poledne",
            morning: "ráno",
            afternoon: "odpoledne",
            evening: "večer",
            night: "noc"
        }
    },
    Qn = (t, e) => Number(t) + ".",
    er = {
        ordinalNumber: Qn,
        era: h({
            values: Bn,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: Jn,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: qn,
            defaultWidth: "wide",
            formattingValues: Zn,
            defaultFormattingWidth: "wide"
        }),
        day: h({
            values: Xn,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: Yn,
            defaultWidth: "wide",
            formattingValues: Gn,
            defaultFormattingWidth: "wide"
        })
    },
    tr = /^(\d+)\.?/i,
    or = /\d+/i,
    ir = {
        narrow: /^(p[řr](\.|ed) Kr\.|p[řr](\.|ed) n\. l\.|po Kr\.|n\. l\.)/i,
        abbreviated: /^(p[řr](\.|ed) Kr\.|p[řr](\.|ed) n\. l\.|po Kr\.|n\. l\.)/i,
        wide: /^(p[řr](\.|ed) Kristem|p[řr](\.|ed) na[šs][íi]m letopo[čc]tem|po Kristu|na[šs]eho letopo[čc]tu)/i
    },
    ar = {
        any: [/^p[řr]/i, /^(po|n)/i]
    },
    nr = {
        narrow: /^[1234]/i,
        abbreviated: /^[1234]\. [čc]tvrtlet[íi]/i,
        wide: /^[1234]\. [čc]tvrtlet[íi]/i
    },
    rr = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    sr = {
        narrow: /^[lúubdkčcszřrlp]/i,
        abbreviated: /^(led|[úu]no|b[řr]e|dub|kv[ěe]|[čc]vn|[čc]vc|srp|z[áa][řr]|[řr][íi]j|lis|pro)/i,
        wide: /^(leden|ledna|[úu]nora?|b[řr]ezen|b[řr]ezna|duben|dubna|kv[ěe]ten|kv[ěe]tna|[čc]erven(ec|ce)?|[čc]ervna|srpen|srpna|z[áa][řr][íi]|[řr][íi]jen|[řr][íi]jna|listopad(a|u)?|prosinec|prosince)/i
    },
    cr = {
        narrow: [/^l/i, /^[úu]/i, /^b/i, /^d/i, /^k/i, /^[čc]/i, /^[čc]/i, /^s/i, /^z/i, /^[řr]/i, /^l/i, /^p/i],
        any: [/^led/i, /^[úu]n/i, /^b[řr]e/i, /^dub/i, /^kv[ěe]/i, /^[čc]vn|[čc]erven(?!\w)|[čc]ervna/i, /^[čc]vc|[čc]erven(ec|ce)/i, /^srp/i, /^z[áa][řr]/i, /^[řr][íi]j/i, /^lis/i, /^pro/i]
    },
    lr = {
        narrow: /^[npuúsčps]/i,
        short: /^(ne|po|[úu]t|st|[čc]t|p[áa]|so)/i,
        abbreviated: /^(ned|pon|[úu]te|st[rř]|[čc]tv|p[áa]t|sob)/i,
        wide: /^(ned[ěe]le|pond[ěe]l[íi]|[úu]ter[ýy]|st[řr]eda|[čc]tvrtek|p[áa]tek|sobota)/i
    },
    dr = {
        narrow: [/^n/i, /^p/i, /^[úu]/i, /^s/i, /^[čc]/i, /^p/i, /^s/i],
        any: [/^ne/i, /^po/i, /^[úu]t/i, /^st/i, /^[čc]t/i, /^p[áa]/i, /^so/i]
    },
    ur = {
        any: /^dopoledne|dop\.?|odpoledne|odp\.?|p[ůu]lnoc|poledne|r[áa]no|odpoledne|ve[čc]er|(v )?noci?/i
    },
    pr = {
        any: {
            am: /^dop/i,
            pm: /^odp/i,
            midnight: /^p[ůu]lnoc/i,
            noon: /^poledne/i,
            morning: /r[áa]no/i,
            afternoon: /odpoledne/i,
            evening: /ve[čc]er/i,
            night: /noc/i
        }
    },
    mr = {
        ordinalNumber: B({
            matchPattern: tr,
            parsePattern: or,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: ir,
            defaultMatchWidth: "wide",
            parsePatterns: ar,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: nr,
            defaultMatchWidth: "wide",
            parsePatterns: rr,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: sr,
            defaultMatchWidth: "wide",
            parsePatterns: cr,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: lr,
            defaultMatchWidth: "wide",
            parsePatterns: dr,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: ur,
            defaultMatchWidth: "any",
            parsePatterns: pr,
            defaultParseWidth: "any"
        })
    },
    hr = {
        code: "cs",
        formatDistance: Ln,
        formatLong: Vn,
        formatRelative: Kn,
        localize: er,
        match: mr,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    },
    bo = {
        lessThanXSeconds: {
            standalone: {
                one: "weniger als 1 Sekunde",
                other: "weniger als {{count}} Sekunden"
            },
            withPreposition: {
                one: "weniger als 1 Sekunde",
                other: "weniger als {{count}} Sekunden"
            }
        },
        xSeconds: {
            standalone: {
                one: "1 Sekunde",
                other: "{{count}} Sekunden"
            },
            withPreposition: {
                one: "1 Sekunde",
                other: "{{count}} Sekunden"
            }
        },
        halfAMinute: {
            standalone: "halbe Minute",
            withPreposition: "halben Minute"
        },
        lessThanXMinutes: {
            standalone: {
                one: "weniger als 1 Minute",
                other: "weniger als {{count}} Minuten"
            },
            withPreposition: {
                one: "weniger als 1 Minute",
                other: "weniger als {{count}} Minuten"
            }
        },
        xMinutes: {
            standalone: {
                one: "1 Minute",
                other: "{{count}} Minuten"
            },
            withPreposition: {
                one: "1 Minute",
                other: "{{count}} Minuten"
            }
        },
        aboutXHours: {
            standalone: {
                one: "etwa 1 Stunde",
                other: "etwa {{count}} Stunden"
            },
            withPreposition: {
                one: "etwa 1 Stunde",
                other: "etwa {{count}} Stunden"
            }
        },
        xHours: {
            standalone: {
                one: "1 Stunde",
                other: "{{count}} Stunden"
            },
            withPreposition: {
                one: "1 Stunde",
                other: "{{count}} Stunden"
            }
        },
        xDays: {
            standalone: {
                one: "1 Tag",
                other: "{{count}} Tage"
            },
            withPreposition: {
                one: "1 Tag",
                other: "{{count}} Tagen"
            }
        },
        aboutXWeeks: {
            standalone: {
                one: "etwa 1 Woche",
                other: "etwa {{count}} Wochen"
            },
            withPreposition: {
                one: "etwa 1 Woche",
                other: "etwa {{count}} Wochen"
            }
        },
        xWeeks: {
            standalone: {
                one: "1 Woche",
                other: "{{count}} Wochen"
            },
            withPreposition: {
                one: "1 Woche",
                other: "{{count}} Wochen"
            }
        },
        aboutXMonths: {
            standalone: {
                one: "etwa 1 Monat",
                other: "etwa {{count}} Monate"
            },
            withPreposition: {
                one: "etwa 1 Monat",
                other: "etwa {{count}} Monaten"
            }
        },
        xMonths: {
            standalone: {
                one: "1 Monat",
                other: "{{count}} Monate"
            },
            withPreposition: {
                one: "1 Monat",
                other: "{{count}} Monaten"
            }
        },
        aboutXYears: {
            standalone: {
                one: "etwa 1 Jahr",
                other: "etwa {{count}} Jahre"
            },
            withPreposition: {
                one: "etwa 1 Jahr",
                other: "etwa {{count}} Jahren"
            }
        },
        xYears: {
            standalone: {
                one: "1 Jahr",
                other: "{{count}} Jahre"
            },
            withPreposition: {
                one: "1 Jahr",
                other: "{{count}} Jahren"
            }
        },
        overXYears: {
            standalone: {
                one: "mehr als 1 Jahr",
                other: "mehr als {{count}} Jahre"
            },
            withPreposition: {
                one: "mehr als 1 Jahr",
                other: "mehr als {{count}} Jahren"
            }
        },
        almostXYears: {
            standalone: {
                one: "fast 1 Jahr",
                other: "fast {{count}} Jahre"
            },
            withPreposition: {
                one: "fast 1 Jahr",
                other: "fast {{count}} Jahren"
            }
        }
    },
    ri = (t, e, o) => {
        let i;
        const a = o != null && o.addSuffix ? bo[t].withPreposition : bo[t].standalone;
        return typeof a == "string" ? i = a : e === 1 ? i = a.one : i = a.other.replace("{{count}}", String(e)), o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? "in " + i : "vor " + i : i
    },
    fr = {
        full: "EEEE, do MMMM y",
        long: "do MMMM y",
        medium: "do MMM y",
        short: "dd.MM.y"
    },
    wr = {
        full: "HH:mm:ss zzzz",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    gr = {
        full: "{{date}} 'um' {{time}}",
        long: "{{date}} 'um' {{time}}",
        medium: "{{date}} {{time}}",
        short: "{{date}} {{time}}"
    },
    si = {
        date: k({
            formats: fr,
            defaultWidth: "full"
        }),
        time: k({
            formats: wr,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: gr,
            defaultWidth: "full"
        })
    },
    yr = {
        lastWeek: "'letzten' eeee 'um' p",
        yesterday: "'gestern um' p",
        today: "'heute um' p",
        tomorrow: "'morgen um' p",
        nextWeek: "eeee 'um' p",
        other: "P"
    },
    ci = (t, e, o, i) => yr[t],
    zr = {
        narrow: ["v.Chr.", "n.Chr."],
        abbreviated: ["v.Chr.", "n.Chr."],
        wide: ["vor Christus", "nach Christus"]
    },
    br = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
    },
    Pt = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        wide: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    },
    kr = {
        narrow: Pt.narrow,
        abbreviated: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
        wide: Pt.wide
    },
    vr = {
        narrow: ["S", "M", "D", "M", "D", "F", "S"],
        short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
        wide: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    },
    _r = {
        narrow: {
            am: "vm.",
            pm: "nm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "Morgen",
            afternoon: "Nachm.",
            evening: "Abend",
            night: "Nacht"
        },
        abbreviated: {
            am: "vorm.",
            pm: "nachm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "Morgen",
            afternoon: "Nachmittag",
            evening: "Abend",
            night: "Nacht"
        },
        wide: {
            am: "vormittags",
            pm: "nachmittags",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "Morgen",
            afternoon: "Nachmittag",
            evening: "Abend",
            night: "Nacht"
        }
    },
    jr = {
        narrow: {
            am: "vm.",
            pm: "nm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "morgens",
            afternoon: "nachm.",
            evening: "abends",
            night: "nachts"
        },
        abbreviated: {
            am: "vorm.",
            pm: "nachm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "morgens",
            afternoon: "nachmittags",
            evening: "abends",
            night: "nachts"
        },
        wide: {
            am: "vormittags",
            pm: "nachmittags",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "morgens",
            afternoon: "nachmittags",
            evening: "abends",
            night: "nachts"
        }
    },
    $r = t => Number(t) + ".",
    Pr = {
        ordinalNumber: $r,
        era: h({
            values: zr,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: br,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: Pt,
            formattingValues: kr,
            defaultWidth: "wide"
        }),
        day: h({
            values: vr,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: _r,
            defaultWidth: "wide",
            formattingValues: jr,
            defaultFormattingWidth: "wide"
        })
    },
    Mr = /^(\d+)(\.)?/i,
    Sr = /\d+/i,
    xr = {
        narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
        abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
        wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
    },
    Ar = {
        any: [/^v/i, /^n/i]
    },
    Tr = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234](\.)? Quartal/i
    },
    Wr = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    Cr = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
        wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
    },
    Er = {
        narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^j[aä]/i, /^f/i, /^mär/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    Dr = {
        narrow: /^[smdmf]/i,
        short: /^(so|mo|di|mi|do|fr|sa)/i,
        abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
        wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
    },
    Rr = {
        any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
    },
    Or = {
        narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
        abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
        wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
    },
    Lr = {
        any: {
            am: /^v/i,
            pm: /^n/i,
            midnight: /^Mitte/i,
            noon: /^Mitta/i,
            morning: /morgens/i,
            afternoon: /nachmittags/i,
            evening: /abends/i,
            night: /nachts/i
        }
    },
    li = {
        ordinalNumber: B({
            matchPattern: Mr,
            parsePattern: Sr,
            valueCallback: t => parseInt(t)
        }),
        era: f({
            matchPatterns: xr,
            defaultMatchWidth: "wide",
            parsePatterns: Ar,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: Tr,
            defaultMatchWidth: "wide",
            parsePatterns: Wr,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: Cr,
            defaultMatchWidth: "wide",
            parsePatterns: Er,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: Dr,
            defaultMatchWidth: "wide",
            parsePatterns: Rr,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: Or,
            defaultMatchWidth: "wide",
            parsePatterns: Lr,
            defaultParseWidth: "any"
        })
    },
    Ir = {
        code: "de",
        formatDistance: ri,
        formatLong: si,
        formatRelative: ci,
        localize: Pr,
        match: li,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    },
    Ur = {
        narrow: ["v.Chr.", "n.Chr."],
        abbreviated: ["v.Chr.", "n.Chr."],
        wide: ["vor Christus", "nach Christus"]
    },
    Nr = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
    },
    Mt = {
        narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: ["Jän", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        wide: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    },
    Vr = {
        narrow: Mt.narrow,
        abbreviated: ["Jän.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
        wide: Mt.wide
    },
    Fr = {
        narrow: ["S", "M", "D", "M", "D", "F", "S"],
        short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
        wide: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
    },
    Hr = {
        narrow: {
            am: "vm.",
            pm: "nm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "Morgen",
            afternoon: "Nachm.",
            evening: "Abend",
            night: "Nacht"
        },
        abbreviated: {
            am: "vorm.",
            pm: "nachm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "Morgen",
            afternoon: "Nachmittag",
            evening: "Abend",
            night: "Nacht"
        },
        wide: {
            am: "vormittags",
            pm: "nachmittags",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "Morgen",
            afternoon: "Nachmittag",
            evening: "Abend",
            night: "Nacht"
        }
    },
    Kr = {
        narrow: {
            am: "vm.",
            pm: "nm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "morgens",
            afternoon: "nachm.",
            evening: "abends",
            night: "nachts"
        },
        abbreviated: {
            am: "vorm.",
            pm: "nachm.",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "morgens",
            afternoon: "nachmittags",
            evening: "abends",
            night: "nachts"
        },
        wide: {
            am: "vormittags",
            pm: "nachmittags",
            midnight: "Mitternacht",
            noon: "Mittag",
            morning: "morgens",
            afternoon: "nachmittags",
            evening: "abends",
            night: "nachts"
        }
    },
    Br = t => Number(t) + ".",
    Jr = {
        ordinalNumber: Br,
        era: h({
            values: Ur,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: Nr,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: Mt,
            formattingValues: Vr,
            defaultWidth: "wide"
        }),
        day: h({
            values: Fr,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: Hr,
            defaultWidth: "wide",
            formattingValues: Kr,
            defaultFormattingWidth: "wide"
        })
    },
    qr = {
        code: "de-AT",
        formatDistance: ri,
        formatLong: si,
        formatRelative: ci,
        localize: Jr,
        match: li,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    },
    Zr = {
        lessThanXSeconds: {
            one: "menos de un segundo",
            other: "menos de {{count}} segundos"
        },
        xSeconds: {
            one: "1 segundo",
            other: "{{count}} segundos"
        },
        halfAMinute: "medio minuto",
        lessThanXMinutes: {
            one: "menos de un minuto",
            other: "menos de {{count}} minutos"
        },
        xMinutes: {
            one: "1 minuto",
            other: "{{count}} minutos"
        },
        aboutXHours: {
            one: "alrededor de 1 hora",
            other: "alrededor de {{count}} horas"
        },
        xHours: {
            one: "1 hora",
            other: "{{count}} horas"
        },
        xDays: {
            one: "1 día",
            other: "{{count}} días"
        },
        aboutXWeeks: {
            one: "alrededor de 1 semana",
            other: "alrededor de {{count}} semanas"
        },
        xWeeks: {
            one: "1 semana",
            other: "{{count}} semanas"
        },
        aboutXMonths: {
            one: "alrededor de 1 mes",
            other: "alrededor de {{count}} meses"
        },
        xMonths: {
            one: "1 mes",
            other: "{{count}} meses"
        },
        aboutXYears: {
            one: "alrededor de 1 año",
            other: "alrededor de {{count}} años"
        },
        xYears: {
            one: "1 año",
            other: "{{count}} años"
        },
        overXYears: {
            one: "más de 1 año",
            other: "más de {{count}} años"
        },
        almostXYears: {
            one: "casi 1 año",
            other: "casi {{count}} años"
        }
    },
    Xr = (t, e, o) => {
        let i;
        const a = Zr[t];
        return typeof a == "string" ? i = a : e === 1 ? i = a.one : i = a.other.replace("{{count}}", e.toString()), o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? "en " + i : "hace " + i : i
    },
    Yr = {
        full: "EEEE, d 'de' MMMM 'de' y",
        long: "d 'de' MMMM 'de' y",
        medium: "d MMM y",
        short: "dd/MM/y"
    },
    Gr = {
        full: "HH:mm:ss zzzz",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    Qr = {
        full: "{{date}} 'a las' {{time}}",
        long: "{{date}} 'a las' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    },
    es = {
        date: k({
            formats: Yr,
            defaultWidth: "full"
        }),
        time: k({
            formats: Gr,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: Qr,
            defaultWidth: "full"
        })
    },
    ts = {
        lastWeek: "'el' eeee 'pasado a la' p",
        yesterday: "'ayer a la' p",
        today: "'hoy a la' p",
        tomorrow: "'mañana a la' p",
        nextWeek: "eeee 'a la' p",
        other: "P"
    },
    os = {
        lastWeek: "'el' eeee 'pasado a las' p",
        yesterday: "'ayer a las' p",
        today: "'hoy a las' p",
        tomorrow: "'mañana a las' p",
        nextWeek: "eeee 'a las' p",
        other: "P"
    },
    is = (t, e, o, i) => e.getHours() !== 1 ? os[t] : ts[t],
    as = {
        narrow: ["AC", "DC"],
        abbreviated: ["AC", "DC"],
        wide: ["antes de cristo", "después de cristo"]
    },
    ns = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["T1", "T2", "T3", "T4"],
        wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
    },
    rs = {
        narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
        abbreviated: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
        wide: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    },
    ss = {
        narrow: ["d", "l", "m", "m", "j", "v", "s"],
        short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
        abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
        wide: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
    },
    cs = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mn",
            noon: "md",
            morning: "mañana",
            afternoon: "tarde",
            evening: "tarde",
            night: "noche"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "medianoche",
            noon: "mediodia",
            morning: "mañana",
            afternoon: "tarde",
            evening: "tarde",
            night: "noche"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "medianoche",
            noon: "mediodia",
            morning: "mañana",
            afternoon: "tarde",
            evening: "tarde",
            night: "noche"
        }
    },
    ls = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mn",
            noon: "md",
            morning: "de la mañana",
            afternoon: "de la tarde",
            evening: "de la tarde",
            night: "de la noche"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "medianoche",
            noon: "mediodia",
            morning: "de la mañana",
            afternoon: "de la tarde",
            evening: "de la tarde",
            night: "de la noche"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "medianoche",
            noon: "mediodia",
            morning: "de la mañana",
            afternoon: "de la tarde",
            evening: "de la tarde",
            night: "de la noche"
        }
    },
    ds = (t, e) => Number(t) + "º",
    us = {
        ordinalNumber: ds,
        era: h({
            values: as,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: ns,
            defaultWidth: "wide",
            argumentCallback: t => Number(t) - 1
        }),
        month: h({
            values: rs,
            defaultWidth: "wide"
        }),
        day: h({
            values: ss,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: cs,
            defaultWidth: "wide",
            formattingValues: ls,
            defaultFormattingWidth: "wide"
        })
    },
    ps = /^(\d+)(º)?/i,
    ms = /\d+/i,
    hs = {
        narrow: /^(ac|dc|a|d)/i,
        abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
        wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
    },
    fs = {
        any: [/^ac/i, /^dc/i],
        wide: [/^(antes de cristo|antes de la era com[uú]n)/i, /^(despu[eé]s de cristo|era com[uú]n)/i]
    },
    ws = {
        narrow: /^[1234]/i,
        abbreviated: /^T[1234]/i,
        wide: /^[1234](º)? trimestre/i
    },
    gs = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    ys = {
        narrow: /^[efmajsond]/i,
        abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
        wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
    },
    zs = {
        narrow: [/^e/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^en/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i]
    },
    bs = {
        narrow: /^[dlmjvs]/i,
        short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
        abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
        wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
    },
    ks = {
        narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
        any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
    },
    vs = {
        narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
        any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
    },
    _s = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mn/i,
            noon: /^md/i,
            morning: /mañana/i,
            afternoon: /tarde/i,
            evening: /tarde/i,
            night: /noche/i
        }
    },
    js = {
        ordinalNumber: B({
            matchPattern: ps,
            parsePattern: ms,
            valueCallback: function(t) {
                return parseInt(t, 10)
            }
        }),
        era: f({
            matchPatterns: hs,
            defaultMatchWidth: "wide",
            parsePatterns: fs,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: ws,
            defaultMatchWidth: "wide",
            parsePatterns: gs,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: ys,
            defaultMatchWidth: "wide",
            parsePatterns: zs,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: bs,
            defaultMatchWidth: "wide",
            parsePatterns: ks,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: vs,
            defaultMatchWidth: "any",
            parsePatterns: _s,
            defaultParseWidth: "any"
        })
    },
    $s = {
        code: "es",
        formatDistance: Xr,
        formatLong: es,
        formatRelative: is,
        localize: us,
        match: js,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 1
        }
    },
    ko = {
        lessThanXSeconds: {
            standalone: {
                one: "vähem kui üks sekund",
                other: "vähem kui {{count}} sekundit"
            },
            withPreposition: {
                one: "vähem kui ühe sekundi",
                other: "vähem kui {{count}} sekundi"
            }
        },
        xSeconds: {
            standalone: {
                one: "üks sekund",
                other: "{{count}} sekundit"
            },
            withPreposition: {
                one: "ühe sekundi",
                other: "{{count}} sekundi"
            }
        },
        halfAMinute: {
            standalone: "pool minutit",
            withPreposition: "poole minuti"
        },
        lessThanXMinutes: {
            standalone: {
                one: "vähem kui üks minut",
                other: "vähem kui {{count}} minutit"
            },
            withPreposition: {
                one: "vähem kui ühe minuti",
                other: "vähem kui {{count}} minuti"
            }
        },
        xMinutes: {
            standalone: {
                one: "üks minut",
                other: "{{count}} minutit"
            },
            withPreposition: {
                one: "ühe minuti",
                other: "{{count}} minuti"
            }
        },
        aboutXHours: {
            standalone: {
                one: "umbes üks tund",
                other: "umbes {{count}} tundi"
            },
            withPreposition: {
                one: "umbes ühe tunni",
                other: "umbes {{count}} tunni"
            }
        },
        xHours: {
            standalone: {
                one: "üks tund",
                other: "{{count}} tundi"
            },
            withPreposition: {
                one: "ühe tunni",
                other: "{{count}} tunni"
            }
        },
        xDays: {
            standalone: {
                one: "üks päev",
                other: "{{count}} päeva"
            },
            withPreposition: {
                one: "ühe päeva",
                other: "{{count}} päeva"
            }
        },
        aboutXWeeks: {
            standalone: {
                one: "umbes üks nädal",
                other: "umbes {{count}} nädalat"
            },
            withPreposition: {
                one: "umbes ühe nädala",
                other: "umbes {{count}} nädala"
            }
        },
        xWeeks: {
            standalone: {
                one: "üks nädal",
                other: "{{count}} nädalat"
            },
            withPreposition: {
                one: "ühe nädala",
                other: "{{count}} nädala"
            }
        },
        aboutXMonths: {
            standalone: {
                one: "umbes üks kuu",
                other: "umbes {{count}} kuud"
            },
            withPreposition: {
                one: "umbes ühe kuu",
                other: "umbes {{count}} kuu"
            }
        },
        xMonths: {
            standalone: {
                one: "üks kuu",
                other: "{{count}} kuud"
            },
            withPreposition: {
                one: "ühe kuu",
                other: "{{count}} kuu"
            }
        },
        aboutXYears: {
            standalone: {
                one: "umbes üks aasta",
                other: "umbes {{count}} aastat"
            },
            withPreposition: {
                one: "umbes ühe aasta",
                other: "umbes {{count}} aasta"
            }
        },
        xYears: {
            standalone: {
                one: "üks aasta",
                other: "{{count}} aastat"
            },
            withPreposition: {
                one: "ühe aasta",
                other: "{{count}} aasta"
            }
        },
        overXYears: {
            standalone: {
                one: "rohkem kui üks aasta",
                other: "rohkem kui {{count}} aastat"
            },
            withPreposition: {
                one: "rohkem kui ühe aasta",
                other: "rohkem kui {{count}} aasta"
            }
        },
        almostXYears: {
            standalone: {
                one: "peaaegu üks aasta",
                other: "peaaegu {{count}} aastat"
            },
            withPreposition: {
                one: "peaaegu ühe aasta",
                other: "peaaegu {{count}} aasta"
            }
        }
    },
    Ps = (t, e, o) => {
        const i = o != null && o.addSuffix ? ko[t].withPreposition : ko[t].standalone;
        let a;
        return typeof i == "string" ? a = i : e === 1 ? a = i.one : a = i.other.replace("{{count}}", String(e)), o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? a + " pärast" : a + " eest" : a
    },
    Ms = {
        full: "EEEE, d. MMMM y",
        long: "d. MMMM y",
        medium: "d. MMM y",
        short: "dd.MM.y"
    },
    Ss = {
        full: "HH:mm:ss zzzz",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    xs = {
        full: "{{date}} 'kell' {{time}}",
        long: "{{date}} 'kell' {{time}}",
        medium: "{{date}}. {{time}}",
        short: "{{date}}. {{time}}"
    },
    As = {
        date: k({
            formats: Ms,
            defaultWidth: "full"
        }),
        time: k({
            formats: Ss,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: xs,
            defaultWidth: "full"
        })
    },
    Ts = {
        lastWeek: "'eelmine' eeee 'kell' p",
        yesterday: "'eile kell' p",
        today: "'täna kell' p",
        tomorrow: "'homme kell' p",
        nextWeek: "'järgmine' eeee 'kell' p",
        other: "P"
    },
    Ws = (t, e, o, i) => Ts[t],
    Cs = {
        narrow: ["e.m.a", "m.a.j"],
        abbreviated: ["e.m.a", "m.a.j"],
        wide: ["enne meie ajaarvamist", "meie ajaarvamise järgi"]
    },
    Es = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["K1", "K2", "K3", "K4"],
        wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
    },
    vo = {
        narrow: ["J", "V", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        abbreviated: ["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets"],
        wide: ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"]
    },
    _o = {
        narrow: ["P", "E", "T", "K", "N", "R", "L"],
        short: ["P", "E", "T", "K", "N", "R", "L"],
        abbreviated: ["pühap.", "esmasp.", "teisip.", "kolmap.", "neljap.", "reede.", "laup."],
        wide: ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"]
    },
    Ds = {
        narrow: {
            am: "AM",
            pm: "PM",
            midnight: "kesköö",
            noon: "keskpäev",
            morning: "hommik",
            afternoon: "pärastlõuna",
            evening: "õhtu",
            night: "öö"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "kesköö",
            noon: "keskpäev",
            morning: "hommik",
            afternoon: "pärastlõuna",
            evening: "õhtu",
            night: "öö"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "kesköö",
            noon: "keskpäev",
            morning: "hommik",
            afternoon: "pärastlõuna",
            evening: "õhtu",
            night: "öö"
        }
    },
    Rs = {
        narrow: {
            am: "AM",
            pm: "PM",
            midnight: "keskööl",
            noon: "keskpäeval",
            morning: "hommikul",
            afternoon: "pärastlõunal",
            evening: "õhtul",
            night: "öösel"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "keskööl",
            noon: "keskpäeval",
            morning: "hommikul",
            afternoon: "pärastlõunal",
            evening: "õhtul",
            night: "öösel"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "keskööl",
            noon: "keskpäeval",
            morning: "hommikul",
            afternoon: "pärastlõunal",
            evening: "õhtul",
            night: "öösel"
        }
    },
    Os = (t, e) => Number(t) + ".",
    Ls = {
        ordinalNumber: Os,
        era: h({
            values: Cs,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: Es,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: vo,
            defaultWidth: "wide",
            formattingValues: vo,
            defaultFormattingWidth: "wide"
        }),
        day: h({
            values: _o,
            defaultWidth: "wide",
            formattingValues: _o,
            defaultFormattingWidth: "wide"
        }),
        dayPeriod: h({
            values: Ds,
            defaultWidth: "wide",
            formattingValues: Rs,
            defaultFormattingWidth: "wide"
        })
    },
    Is = /^\d+\./i,
    Us = /\d+/i,
    Ns = {
        narrow: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
        abbreviated: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
        wide: /^(enne meie ajaarvamist|meie ajaarvamise järgi|enne Kristust|pärast Kristust)/i
    },
    Vs = {
        any: [/^e/i, /^(m|p)/i]
    },
    Fs = {
        narrow: /^[1234]/i,
        abbreviated: /^K[1234]/i,
        wide: /^[1234](\.)? kvartal/i
    },
    Hs = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    Ks = {
        narrow: /^[jvmasond]/i,
        abbreviated: /^(jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets)/i,
        wide: /^(jaanuar|veebruar|märts|aprill|mai|juuni|juuli|august|september|oktoober|november|detsember)/i
    },
    Bs = {
        narrow: [/^j/i, /^v/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^ja/i, /^v/i, /^mär/i, /^ap/i, /^mai/i, /^juun/i, /^juul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    Js = {
        narrow: /^[petknrl]/i,
        short: /^[petknrl]/i,
        abbreviated: /^(püh?|esm?|tei?|kolm?|nel?|ree?|laup?)\.?/i,
        wide: /^(pühapäev|esmaspäev|teisipäev|kolmapäev|neljapäev|reede|laupäev)/i
    },
    qs = {
        any: [/^p/i, /^e/i, /^t/i, /^k/i, /^n/i, /^r/i, /^l/i]
    },
    Zs = {
        any: /^(am|pm|keskööl?|keskpäev(al)?|hommik(ul)?|pärastlõunal?|õhtul?|öö(sel)?)/i
    },
    Xs = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^keskö/i,
            noon: /^keskp/i,
            morning: /hommik/i,
            afternoon: /pärastlõuna/i,
            evening: /õhtu/i,
            night: /öö/i
        }
    },
    Ys = {
        ordinalNumber: B({
            matchPattern: Is,
            parsePattern: Us,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: Ns,
            defaultMatchWidth: "wide",
            parsePatterns: Vs,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: Fs,
            defaultMatchWidth: "wide",
            parsePatterns: Hs,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: Ks,
            defaultMatchWidth: "wide",
            parsePatterns: Bs,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: Js,
            defaultMatchWidth: "wide",
            parsePatterns: qs,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: Zs,
            defaultMatchWidth: "any",
            parsePatterns: Xs,
            defaultParseWidth: "any"
        })
    },
    Gs = {
        code: "et",
        formatDistance: Ps,
        formatLong: As,
        formatRelative: Ws,
        localize: Ls,
        match: Ys,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    },
    Qs = {
        lessThanXSeconds: {
            one: {
                standalone: "manje od 1 sekunde",
                withPrepositionAgo: "manje od 1 sekunde",
                withPrepositionIn: "manje od 1 sekundu"
            },
            dual: "manje od {{count}} sekunde",
            other: "manje od {{count}} sekundi"
        },
        xSeconds: {
            one: {
                standalone: "1 sekunda",
                withPrepositionAgo: "1 sekunde",
                withPrepositionIn: "1 sekundu"
            },
            dual: "{{count}} sekunde",
            other: "{{count}} sekundi"
        },
        halfAMinute: "pola minute",
        lessThanXMinutes: {
            one: {
                standalone: "manje od 1 minute",
                withPrepositionAgo: "manje od 1 minute",
                withPrepositionIn: "manje od 1 minutu"
            },
            dual: "manje od {{count}} minute",
            other: "manje od {{count}} minuta"
        },
        xMinutes: {
            one: {
                standalone: "1 minuta",
                withPrepositionAgo: "1 minute",
                withPrepositionIn: "1 minutu"
            },
            dual: "{{count}} minute",
            other: "{{count}} minuta"
        },
        aboutXHours: {
            one: {
                standalone: "oko 1 sat",
                withPrepositionAgo: "oko 1 sat",
                withPrepositionIn: "oko 1 sat"
            },
            dual: "oko {{count}} sata",
            other: "oko {{count}} sati"
        },
        xHours: {
            one: {
                standalone: "1 sat",
                withPrepositionAgo: "1 sat",
                withPrepositionIn: "1 sat"
            },
            dual: "{{count}} sata",
            other: "{{count}} sati"
        },
        xDays: {
            one: {
                standalone: "1 dan",
                withPrepositionAgo: "1 dan",
                withPrepositionIn: "1 dan"
            },
            dual: "{{count}} dana",
            other: "{{count}} dana"
        },
        aboutXWeeks: {
            one: {
                standalone: "oko 1 tjedan",
                withPrepositionAgo: "oko 1 tjedan",
                withPrepositionIn: "oko 1 tjedan"
            },
            dual: "oko {{count}} tjedna",
            other: "oko {{count}} tjedana"
        },
        xWeeks: {
            one: {
                standalone: "1 tjedan",
                withPrepositionAgo: "1 tjedan",
                withPrepositionIn: "1 tjedan"
            },
            dual: "{{count}} tjedna",
            other: "{{count}} tjedana"
        },
        aboutXMonths: {
            one: {
                standalone: "oko 1 mjesec",
                withPrepositionAgo: "oko 1 mjesec",
                withPrepositionIn: "oko 1 mjesec"
            },
            dual: "oko {{count}} mjeseca",
            other: "oko {{count}} mjeseci"
        },
        xMonths: {
            one: {
                standalone: "1 mjesec",
                withPrepositionAgo: "1 mjesec",
                withPrepositionIn: "1 mjesec"
            },
            dual: "{{count}} mjeseca",
            other: "{{count}} mjeseci"
        },
        aboutXYears: {
            one: {
                standalone: "oko 1 godinu",
                withPrepositionAgo: "oko 1 godinu",
                withPrepositionIn: "oko 1 godinu"
            },
            dual: "oko {{count}} godine",
            other: "oko {{count}} godina"
        },
        xYears: {
            one: {
                standalone: "1 godina",
                withPrepositionAgo: "1 godine",
                withPrepositionIn: "1 godinu"
            },
            dual: "{{count}} godine",
            other: "{{count}} godina"
        },
        overXYears: {
            one: {
                standalone: "preko 1 godinu",
                withPrepositionAgo: "preko 1 godinu",
                withPrepositionIn: "preko 1 godinu"
            },
            dual: "preko {{count}} godine",
            other: "preko {{count}} godina"
        },
        almostXYears: {
            one: {
                standalone: "gotovo 1 godinu",
                withPrepositionAgo: "gotovo 1 godinu",
                withPrepositionIn: "gotovo 1 godinu"
            },
            dual: "gotovo {{count}} godine",
            other: "gotovo {{count}} godina"
        }
    },
    ec = (t, e, o) => {
        let i;
        const a = Qs[t];
        return typeof a == "string" ? i = a : e === 1 ? o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? i = a.one.withPrepositionIn : i = a.one.withPrepositionAgo : i = a.one.standalone : e % 10 > 1 && e % 10 < 5 && String(e).substr(-2, 1) !== "1" ? i = a.dual.replace("{{count}}", String(e)) : i = a.other.replace("{{count}}", String(e)), o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? "za " + i : "prije " + i : i
    },
    tc = {
        full: "EEEE, d. MMMM y.",
        long: "d. MMMM y.",
        medium: "d. MMM y.",
        short: "dd. MM. y."
    },
    oc = {
        full: "HH:mm:ss (zzzz)",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    ic = {
        full: "{{date}} 'u' {{time}}",
        long: "{{date}} 'u' {{time}}",
        medium: "{{date}} {{time}}",
        short: "{{date}} {{time}}"
    },
    ac = {
        date: k({
            formats: tc,
            defaultWidth: "full"
        }),
        time: k({
            formats: oc,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: ic,
            defaultWidth: "full"
        })
    },
    nc = {
        lastWeek: t => {
            switch (t.getDay()) {
                case 0:
                    return "'prošlu nedjelju u' p";
                case 3:
                    return "'prošlu srijedu u' p";
                case 6:
                    return "'prošlu subotu u' p";
                default:
                    return "'prošli' EEEE 'u' p"
            }
        },
        yesterday: "'jučer u' p",
        today: "'danas u' p",
        tomorrow: "'sutra u' p",
        nextWeek: t => {
            switch (t.getDay()) {
                case 0:
                    return "'iduću nedjelju u' p";
                case 3:
                    return "'iduću srijedu u' p";
                case 6:
                    return "'iduću subotu u' p";
                default:
                    return "'prošli' EEEE 'u' p"
            }
        },
        other: "P"
    },
    rc = (t, e, o, i) => {
        const a = nc[t];
        return typeof a == "function" ? a(e) : a
    },
    sc = {
        narrow: ["pr.n.e.", "AD"],
        abbreviated: ["pr. Kr.", "po. Kr."],
        wide: ["Prije Krista", "Poslije Krista"]
    },
    cc = {
        narrow: ["1.", "2.", "3.", "4."],
        abbreviated: ["1. kv.", "2. kv.", "3. kv.", "4. kv."],
        wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
    },
    lc = {
        narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
        abbreviated: ["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"],
        wide: ["siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"]
    },
    dc = {
        narrow: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12."],
        abbreviated: ["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"],
        wide: ["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenog", "prosinca"]
    },
    uc = {
        narrow: ["N", "P", "U", "S", "Č", "P", "S"],
        short: ["ned", "pon", "uto", "sri", "čet", "pet", "sub"],
        abbreviated: ["ned", "pon", "uto", "sri", "čet", "pet", "sub"],
        wide: ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"]
    },
    pc = {
        narrow: {
            am: "AM",
            pm: "PM",
            midnight: "ponoć",
            noon: "podne",
            morning: "ujutro",
            afternoon: "popodne",
            evening: "navečer",
            night: "noću"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "ponoć",
            noon: "podne",
            morning: "ujutro",
            afternoon: "popodne",
            evening: "navečer",
            night: "noću"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "ponoć",
            noon: "podne",
            morning: "ujutro",
            afternoon: "poslije podne",
            evening: "navečer",
            night: "noću"
        }
    },
    mc = {
        narrow: {
            am: "AM",
            pm: "PM",
            midnight: "ponoć",
            noon: "podne",
            morning: "ujutro",
            afternoon: "popodne",
            evening: "navečer",
            night: "noću"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "ponoć",
            noon: "podne",
            morning: "ujutro",
            afternoon: "popodne",
            evening: "navečer",
            night: "noću"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "ponoć",
            noon: "podne",
            morning: "ujutro",
            afternoon: "poslije podne",
            evening: "navečer",
            night: "noću"
        }
    },
    hc = (t, e) => Number(t) + ".",
    fc = {
        ordinalNumber: hc,
        era: h({
            values: sc,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: cc,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: lc,
            defaultWidth: "wide",
            formattingValues: dc,
            defaultFormattingWidth: "wide"
        }),
        day: h({
            values: uc,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: mc,
            defaultWidth: "wide",
            formattingValues: pc,
            defaultFormattingWidth: "wide"
        })
    },
    wc = /^(\d+)\./i,
    gc = /\d+/i,
    yc = {
        narrow: /^(pr\.n\.e\.|AD)/i,
        abbreviated: /^(pr\.\s?Kr\.|po\.\s?Kr\.)/i,
        wide: /^(Prije Krista|prije nove ere|Poslije Krista|nova era)/i
    },
    zc = {
        any: [/^pr/i, /^(po|nova)/i]
    },
    bc = {
        narrow: /^[1234]/i,
        abbreviated: /^[1234]\.\s?kv\.?/i,
        wide: /^[1234]\. kvartal/i
    },
    kc = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    vc = {
        narrow: /^(10|11|12|[123456789])\./i,
        abbreviated: /^(sij|velj|(ožu|ozu)|tra|svi|lip|srp|kol|ruj|lis|stu|pro)/i,
        wide: /^((siječanj|siječnja|sijecanj|sijecnja)|(veljača|veljače|veljaca|veljace)|(ožujak|ožujka|ozujak|ozujka)|(travanj|travnja)|(svibanj|svibnja)|(lipanj|lipnja)|(srpanj|srpnja)|(kolovoz|kolovoza)|(rujan|rujna)|(listopad|listopada)|(studeni|studenog)|(prosinac|prosinca))/i
    },
    _c = {
        narrow: [/1/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i, /8/i, /9/i, /10/i, /11/i, /12/i],
        abbreviated: [/^sij/i, /^velj/i, /^(ožu|ozu)/i, /^tra/i, /^svi/i, /^lip/i, /^srp/i, /^kol/i, /^ruj/i, /^lis/i, /^stu/i, /^pro/i],
        wide: [/^sij/i, /^velj/i, /^(ožu|ozu)/i, /^tra/i, /^svi/i, /^lip/i, /^srp/i, /^kol/i, /^ruj/i, /^lis/i, /^stu/i, /^pro/i]
    },
    jc = {
        narrow: /^[npusčc]/i,
        short: /^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,
        abbreviated: /^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,
        wide: /^(nedjelja|ponedjeljak|utorak|srijeda|(četvrtak|cetvrtak)|petak|subota)/i
    },
    $c = {
        narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
        any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
    },
    Pc = {
        any: /^(am|pm|ponoc|ponoć|(po)?podne|navecer|navečer|noću|poslije podne|ujutro)/i
    },
    Mc = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^pono/i,
            noon: /^pod/i,
            morning: /jutro/i,
            afternoon: /(poslije\s|po)+podne/i,
            evening: /(navece|naveče)/i,
            night: /(nocu|noću)/i
        }
    },
    Sc = {
        ordinalNumber: B({
            matchPattern: wc,
            parsePattern: gc,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: yc,
            defaultMatchWidth: "wide",
            parsePatterns: zc,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: bc,
            defaultMatchWidth: "wide",
            parsePatterns: kc,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: vc,
            defaultMatchWidth: "wide",
            parsePatterns: _c,
            defaultParseWidth: "wide"
        }),
        day: f({
            matchPatterns: jc,
            defaultMatchWidth: "wide",
            parsePatterns: $c,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: Pc,
            defaultMatchWidth: "any",
            parsePatterns: Mc,
            defaultParseWidth: "any"
        })
    },
    xc = {
        code: "hr",
        formatDistance: ec,
        formatLong: ac,
        formatRelative: rc,
        localize: fc,
        match: Sc,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 1
        }
    },
    Ac = {
        about: "körülbelül",
        over: "több mint",
        almost: "majdnem",
        lessthan: "kevesebb mint"
    },
    Tc = {
        xseconds: " másodperc",
        halfaminute: "fél perc",
        xminutes: " perc",
        xhours: " óra",
        xdays: " nap",
        xweeks: " hét",
        xmonths: " hónap",
        xyears: " év"
    },
    Wc = {
        xseconds: {
            "-1": " másodperccel ezelőtt",
            1: " másodperc múlva",
            0: " másodperce"
        },
        halfaminute: {
            "-1": "fél perccel ezelőtt",
            1: "fél perc múlva",
            0: "fél perce"
        },
        xminutes: {
            "-1": " perccel ezelőtt",
            1: " perc múlva",
            0: " perce"
        },
        xhours: {
            "-1": " órával ezelőtt",
            1: " óra múlva",
            0: " órája"
        },
        xdays: {
            "-1": " nappal ezelőtt",
            1: " nap múlva",
            0: " napja"
        },
        xweeks: {
            "-1": " héttel ezelőtt",
            1: " hét múlva",
            0: " hete"
        },
        xmonths: {
            "-1": " hónappal ezelőtt",
            1: " hónap múlva",
            0: " hónapja"
        },
        xyears: {
            "-1": " évvel ezelőtt",
            1: " év múlva",
            0: " éve"
        }
    },
    Cc = (t, e, o) => {
        const i = t.match(/about|over|almost|lessthan/i),
            a = i ? t.replace(i[0], "") : t,
            r = (o == null ? void 0 : o.addSuffix) === !0,
            s = a.toLowerCase(),
            l = (o == null ? void 0 : o.comparison) || 0,
            d = r ? Wc[s][l] : Tc[s];
        let u = s === "halfaminute" ? d : e + d;
        if (i) {
            const w = i[0].toLowerCase();
            u = Ac[w] + " " + u
        }
        return u
    },
    Ec = {
        full: "y. MMMM d., EEEE",
        long: "y. MMMM d.",
        medium: "y. MMM d.",
        short: "y. MM. dd."
    },
    Dc = {
        full: "H:mm:ss zzzz",
        long: "H:mm:ss z",
        medium: "H:mm:ss",
        short: "H:mm"
    },
    Rc = {
        full: "{{date}} {{time}}",
        long: "{{date}} {{time}}",
        medium: "{{date}} {{time}}",
        short: "{{date}} {{time}}"
    },
    Oc = {
        date: k({
            formats: Ec,
            defaultWidth: "full"
        }),
        time: k({
            formats: Dc,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: Rc,
            defaultWidth: "full"
        })
    },
    Lc = ["vasárnap", "hétfőn", "kedden", "szerdán", "csütörtökön", "pénteken", "szombaton"];

function jo(t) {
    return e => {
        const o = Lc[e.getDay()];
        return `${t?"":"'múlt' "}'${o}' p'-kor'`
    }
}
const Ic = {
        lastWeek: jo(!1),
        yesterday: "'tegnap' p'-kor'",
        today: "'ma' p'-kor'",
        tomorrow: "'holnap' p'-kor'",
        nextWeek: jo(!0),
        other: "P"
    },
    Uc = (t, e) => {
        const o = Ic[t];
        return typeof o == "function" ? o(e) : o
    },
    Nc = {
        narrow: ["ie.", "isz."],
        abbreviated: ["i. e.", "i. sz."],
        wide: ["Krisztus előtt", "időszámításunk szerint"]
    },
    Vc = {
        narrow: ["1.", "2.", "3.", "4."],
        abbreviated: ["1. n.év", "2. n.év", "3. n.év", "4. n.év"],
        wide: ["1. negyedév", "2. negyedév", "3. negyedév", "4. negyedév"]
    },
    Fc = {
        narrow: ["I.", "II.", "III.", "IV."],
        abbreviated: ["I. n.év", "II. n.év", "III. n.év", "IV. n.év"],
        wide: ["I. negyedév", "II. negyedév", "III. negyedév", "IV. negyedév"]
    },
    Hc = {
        narrow: ["J", "F", "M", "Á", "M", "J", "J", "A", "Sz", "O", "N", "D"],
        abbreviated: ["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."],
        wide: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"]
    },
    Kc = {
        narrow: ["V", "H", "K", "Sz", "Cs", "P", "Sz"],
        short: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
        abbreviated: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
        wide: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
    },
    Bc = {
        narrow: {
            am: "de.",
            pm: "du.",
            midnight: "éjfél",
            noon: "dél",
            morning: "reggel",
            afternoon: "du.",
            evening: "este",
            night: "éjjel"
        },
        abbreviated: {
            am: "de.",
            pm: "du.",
            midnight: "éjfél",
            noon: "dél",
            morning: "reggel",
            afternoon: "du.",
            evening: "este",
            night: "éjjel"
        },
        wide: {
            am: "de.",
            pm: "du.",
            midnight: "éjfél",
            noon: "dél",
            morning: "reggel",
            afternoon: "délután",
            evening: "este",
            night: "éjjel"
        }
    },
    Jc = (t, e) => Number(t) + ".",
    qc = {
        ordinalNumber: Jc,
        era: h({
            values: Nc,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: Vc,
            defaultWidth: "wide",
            argumentCallback: t => t - 1,
            formattingValues: Fc,
            defaultFormattingWidth: "wide"
        }),
        month: h({
            values: Hc,
            defaultWidth: "wide"
        }),
        day: h({
            values: Kc,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: Bc,
            defaultWidth: "wide"
        })
    },
    Zc = /^(\d+)\.?/i,
    Xc = /\d+/i,
    Yc = {
        narrow: /^(ie\.|isz\.)/i,
        abbreviated: /^(i\.\s?e\.?|b?\s?c\s?e|i\.\s?sz\.?)/i,
        wide: /^(Krisztus előtt|időszámításunk előtt|időszámításunk szerint|i\. sz\.)/i
    },
    Gc = {
        narrow: [/ie/i, /isz/i],
        abbreviated: [/^(i\.?\s?e\.?|b\s?ce)/i, /^(i\.?\s?sz\.?|c\s?e)/i],
        any: [/előtt/i, /(szerint|i. sz.)/i]
    },
    Qc = {
        narrow: /^[1234]\.?/i,
        abbreviated: /^[1234]?\.?\s?n\.év/i,
        wide: /^([1234]|I|II|III|IV)?\.?\s?negyedév/i
    },
    el = {
        any: [/1|I$/i, /2|II$/i, /3|III/i, /4|IV/i]
    },
    tl = {
        narrow: /^[jfmaásond]|sz/i,
        abbreviated: /^(jan\.?|febr\.?|márc\.?|ápr\.?|máj\.?|jún\.?|júl\.?|aug\.?|szept\.?|okt\.?|nov\.?|dec\.?)/i,
        wide: /^(január|február|március|április|május|június|július|augusztus|szeptember|október|november|december)/i
    },
    ol = {
        narrow: [/^j/i, /^f/i, /^m/i, /^a|á/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s|sz/i, /^o/i, /^n/i, /^d/i],
        any: [/^ja/i, /^f/i, /^már/i, /^áp/i, /^máj/i, /^jún/i, /^júl/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    il = {
        narrow: /^([vhkpc]|sz|cs|sz)/i,
        short: /^([vhkp]|sze|cs|szo)/i,
        abbreviated: /^([vhkp]|sze|cs|szo)/i,
        wide: /^(vasárnap|hétfő|kedd|szerda|csütörtök|péntek|szombat)/i
    },
    al = {
        narrow: [/^v/i, /^h/i, /^k/i, /^sz/i, /^c/i, /^p/i, /^sz/i],
        any: [/^v/i, /^h/i, /^k/i, /^sze/i, /^c/i, /^p/i, /^szo/i]
    },
    nl = {
        any: /^((de|du)\.?|éjfél|délután|dél|reggel|este|éjjel)/i
    },
    rl = {
        any: {
            am: /^de\.?/i,
            pm: /^du\.?/i,
            midnight: /^éjf/i,
            noon: /^dé/i,
            morning: /reg/i,
            afternoon: /^délu\.?/i,
            evening: /es/i,
            night: /éjj/i
        }
    },
    sl = {
        ordinalNumber: B({
            matchPattern: Zc,
            parsePattern: Xc,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: Yc,
            defaultMatchWidth: "wide",
            parsePatterns: Gc,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: Qc,
            defaultMatchWidth: "wide",
            parsePatterns: el,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: tl,
            defaultMatchWidth: "wide",
            parsePatterns: ol,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: il,
            defaultMatchWidth: "wide",
            parsePatterns: al,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: nl,
            defaultMatchWidth: "any",
            parsePatterns: rl,
            defaultParseWidth: "any"
        })
    },
    cl = {
        code: "hu",
        formatDistance: Cc,
        formatLong: Oc,
        formatRelative: Uc,
        localize: qc,
        match: sl,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    },
    ll = {
        lessThanXSeconds: {
            one: "meno di un secondo",
            other: "meno di {{count}} secondi"
        },
        xSeconds: {
            one: "un secondo",
            other: "{{count}} secondi"
        },
        halfAMinute: "alcuni secondi",
        lessThanXMinutes: {
            one: "meno di un minuto",
            other: "meno di {{count}} minuti"
        },
        xMinutes: {
            one: "un minuto",
            other: "{{count}} minuti"
        },
        aboutXHours: {
            one: "circa un'ora",
            other: "circa {{count}} ore"
        },
        xHours: {
            one: "un'ora",
            other: "{{count}} ore"
        },
        xDays: {
            one: "un giorno",
            other: "{{count}} giorni"
        },
        aboutXWeeks: {
            one: "circa una settimana",
            other: "circa {{count}} settimane"
        },
        xWeeks: {
            one: "una settimana",
            other: "{{count}} settimane"
        },
        aboutXMonths: {
            one: "circa un mese",
            other: "circa {{count}} mesi"
        },
        xMonths: {
            one: "un mese",
            other: "{{count}} mesi"
        },
        aboutXYears: {
            one: "circa un anno",
            other: "circa {{count}} anni"
        },
        xYears: {
            one: "un anno",
            other: "{{count}} anni"
        },
        overXYears: {
            one: "più di un anno",
            other: "più di {{count}} anni"
        },
        almostXYears: {
            one: "quasi un anno",
            other: "quasi {{count}} anni"
        }
    },
    dl = (t, e, o) => {
        let i;
        const a = ll[t];
        return typeof a == "string" ? i = a : e === 1 ? i = a.one : i = a.other.replace("{{count}}", e.toString()), o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? "tra " + i : i + " fa" : i
    },
    ul = {
        full: "EEEE d MMMM y",
        long: "d MMMM y",
        medium: "d MMM y",
        short: "dd/MM/y"
    },
    pl = {
        full: "HH:mm:ss zzzz",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    ml = {
        full: "{{date}} {{time}}",
        long: "{{date}} {{time}}",
        medium: "{{date}} {{time}}",
        short: "{{date}} {{time}}"
    },
    hl = {
        date: k({
            formats: ul,
            defaultWidth: "full"
        }),
        time: k({
            formats: pl,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: ml,
            defaultWidth: "full"
        })
    },
    Dt = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

function fl(t) {
    switch (t) {
        case 0:
            return "'domenica scorsa alle' p";
        default:
            return "'" + Dt[t] + " scorso alle' p"
    }
}

function $o(t) {
    return "'" + Dt[t] + " alle' p"
}

function wl(t) {
    switch (t) {
        case 0:
            return "'domenica prossima alle' p";
        default:
            return "'" + Dt[t] + " prossimo alle' p"
    }
}
const gl = {
        lastWeek: (t, e, o) => {
            const i = t.getDay();
            return Oe(t, e, o) ? $o(i) : fl(i)
        },
        yesterday: "'ieri alle' p",
        today: "'oggi alle' p",
        tomorrow: "'domani alle' p",
        nextWeek: (t, e, o) => {
            const i = t.getDay();
            return Oe(t, e, o) ? $o(i) : wl(i)
        },
        other: "P"
    },
    yl = (t, e, o, i) => {
        const a = gl[t];
        return typeof a == "function" ? a(e, o, i) : a
    },
    zl = {
        narrow: ["aC", "dC"],
        abbreviated: ["a.C.", "d.C."],
        wide: ["avanti Cristo", "dopo Cristo"]
    },
    bl = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["T1", "T2", "T3", "T4"],
        wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
    },
    kl = {
        narrow: ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"],
        abbreviated: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
        wide: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
    },
    vl = {
        narrow: ["D", "L", "M", "M", "G", "V", "S"],
        short: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
        abbreviated: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
        wide: ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"]
    },
    _l = {
        narrow: {
            am: "m.",
            pm: "p.",
            midnight: "mezzanotte",
            noon: "mezzogiorno",
            morning: "mattina",
            afternoon: "pomeriggio",
            evening: "sera",
            night: "notte"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "mezzanotte",
            noon: "mezzogiorno",
            morning: "mattina",
            afternoon: "pomeriggio",
            evening: "sera",
            night: "notte"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "mezzanotte",
            noon: "mezzogiorno",
            morning: "mattina",
            afternoon: "pomeriggio",
            evening: "sera",
            night: "notte"
        }
    },
    jl = {
        narrow: {
            am: "m.",
            pm: "p.",
            midnight: "mezzanotte",
            noon: "mezzogiorno",
            morning: "di mattina",
            afternoon: "del pomeriggio",
            evening: "di sera",
            night: "di notte"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "mezzanotte",
            noon: "mezzogiorno",
            morning: "di mattina",
            afternoon: "del pomeriggio",
            evening: "di sera",
            night: "di notte"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "mezzanotte",
            noon: "mezzogiorno",
            morning: "di mattina",
            afternoon: "del pomeriggio",
            evening: "di sera",
            night: "di notte"
        }
    },
    $l = (t, e) => {
        const o = Number(t);
        return String(o)
    },
    Pl = {
        ordinalNumber: $l,
        era: h({
            values: zl,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: bl,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: kl,
            defaultWidth: "wide"
        }),
        day: h({
            values: vl,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: _l,
            defaultWidth: "wide",
            formattingValues: jl,
            defaultFormattingWidth: "wide"
        })
    },
    Ml = /^(\d+)(º)?/i,
    Sl = /\d+/i,
    xl = {
        narrow: /^(aC|dC)/i,
        abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
        wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
    },
    Al = {
        any: [/^a/i, /^(d|e)/i]
    },
    Tl = {
        narrow: /^[1234]/i,
        abbreviated: /^t[1234]/i,
        wide: /^[1234](º)? trimestre/i
    },
    Wl = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    Cl = {
        narrow: /^[gfmalsond]/i,
        abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
        wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
    },
    El = {
        narrow: [/^g/i, /^f/i, /^m/i, /^a/i, /^m/i, /^g/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^ge/i, /^f/i, /^mar/i, /^ap/i, /^mag/i, /^gi/i, /^l/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    Dl = {
        narrow: /^[dlmgvs]/i,
        short: /^(do|lu|ma|me|gi|ve|sa)/i,
        abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
        wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
    },
    Rl = {
        narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^g/i, /^v/i, /^s/i],
        any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^g/i, /^v/i, /^s/i]
    },
    Ol = {
        narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
        any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
    },
    Ll = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mezza/i,
            noon: /^mezzo/i,
            morning: /mattina/i,
            afternoon: /pomeriggio/i,
            evening: /sera/i,
            night: /notte/i
        }
    },
    Il = {
        ordinalNumber: B({
            matchPattern: Ml,
            parsePattern: Sl,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: xl,
            defaultMatchWidth: "wide",
            parsePatterns: Al,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: Tl,
            defaultMatchWidth: "wide",
            parsePatterns: Wl,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: Cl,
            defaultMatchWidth: "wide",
            parsePatterns: El,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: Dl,
            defaultMatchWidth: "wide",
            parsePatterns: Rl,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: Ol,
            defaultMatchWidth: "any",
            parsePatterns: Ll,
            defaultParseWidth: "any"
        })
    },
    Ul = {
        code: "it",
        formatDistance: dl,
        formatLong: hl,
        formatRelative: yl,
        localize: Pl,
        match: Il,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    },
    Nl = {
        lessThanXSeconds: {
            one: {
                regular: "mniej niż sekunda",
                past: "mniej niż sekundę",
                future: "mniej niż sekundę"
            },
            twoFour: "mniej niż {{count}} sekundy",
            other: "mniej niż {{count}} sekund"
        },
        xSeconds: {
            one: {
                regular: "sekunda",
                past: "sekundę",
                future: "sekundę"
            },
            twoFour: "{{count}} sekundy",
            other: "{{count}} sekund"
        },
        halfAMinute: {
            one: "pół minuty",
            twoFour: "pół minuty",
            other: "pół minuty"
        },
        lessThanXMinutes: {
            one: {
                regular: "mniej niż minuta",
                past: "mniej niż minutę",
                future: "mniej niż minutę"
            },
            twoFour: "mniej niż {{count}} minuty",
            other: "mniej niż {{count}} minut"
        },
        xMinutes: {
            one: {
                regular: "minuta",
                past: "minutę",
                future: "minutę"
            },
            twoFour: "{{count}} minuty",
            other: "{{count}} minut"
        },
        aboutXHours: {
            one: {
                regular: "około godziny",
                past: "około godziny",
                future: "około godzinę"
            },
            twoFour: "około {{count}} godziny",
            other: "około {{count}} godzin"
        },
        xHours: {
            one: {
                regular: "godzina",
                past: "godzinę",
                future: "godzinę"
            },
            twoFour: "{{count}} godziny",
            other: "{{count}} godzin"
        },
        xDays: {
            one: {
                regular: "dzień",
                past: "dzień",
                future: "1 dzień"
            },
            twoFour: "{{count}} dni",
            other: "{{count}} dni"
        },
        aboutXWeeks: {
            one: "około tygodnia",
            twoFour: "około {{count}} tygodni",
            other: "około {{count}} tygodni"
        },
        xWeeks: {
            one: "tydzień",
            twoFour: "{{count}} tygodnie",
            other: "{{count}} tygodni"
        },
        aboutXMonths: {
            one: "około miesiąc",
            twoFour: "około {{count}} miesiące",
            other: "około {{count}} miesięcy"
        },
        xMonths: {
            one: "miesiąc",
            twoFour: "{{count}} miesiące",
            other: "{{count}} miesięcy"
        },
        aboutXYears: {
            one: "około rok",
            twoFour: "około {{count}} lata",
            other: "około {{count}} lat"
        },
        xYears: {
            one: "rok",
            twoFour: "{{count}} lata",
            other: "{{count}} lat"
        },
        overXYears: {
            one: "ponad rok",
            twoFour: "ponad {{count}} lata",
            other: "ponad {{count}} lat"
        },
        almostXYears: {
            one: "prawie rok",
            twoFour: "prawie {{count}} lata",
            other: "prawie {{count}} lat"
        }
    };

function Vl(t, e) {
    if (e === 1) return t.one;
    const o = e % 100;
    if (o <= 20 && o > 10) return t.other;
    const i = o % 10;
    return i >= 2 && i <= 4 ? t.twoFour : t.other
}

function yt(t, e, o) {
    const i = Vl(t, e);
    return (typeof i == "string" ? i : i[o]).replace("{{count}}", String(e))
}
const Fl = (t, e, o) => {
        const i = Nl[t];
        return o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? "za " + yt(i, e, "future") : yt(i, e, "past") + " temu" : yt(i, e, "regular")
    },
    Hl = {
        full: "EEEE, do MMMM y",
        long: "do MMMM y",
        medium: "do MMM y",
        short: "dd.MM.y"
    },
    Kl = {
        full: "HH:mm:ss zzzz",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    Bl = {
        full: "{{date}} {{time}}",
        long: "{{date}} {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    },
    Jl = {
        date: k({
            formats: Hl,
            defaultWidth: "full"
        }),
        time: k({
            formats: Kl,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: Bl,
            defaultWidth: "full"
        })
    },
    ql = {
        masculine: "ostatni",
        feminine: "ostatnia"
    },
    Zl = {
        masculine: "ten",
        feminine: "ta"
    },
    Xl = {
        masculine: "następny",
        feminine: "następna"
    },
    Yl = {
        0: "feminine",
        1: "masculine",
        2: "masculine",
        3: "feminine",
        4: "masculine",
        5: "masculine",
        6: "feminine"
    };

function Po(t, e, o, i) {
    let a;
    if (Oe(e, o, i)) a = Zl;
    else if (t === "lastWeek") a = ql;
    else if (t === "nextWeek") a = Xl;
    else throw new Error(`Cannot determine adjectives for token ${t}`);
    const r = e.getDay(),
        s = Yl[r];
    return `'${a[s]}' eeee 'o' p`
}
const Gl = {
        lastWeek: Po,
        yesterday: "'wczoraj o' p",
        today: "'dzisiaj o' p",
        tomorrow: "'jutro o' p",
        nextWeek: Po,
        other: "P"
    },
    Ql = (t, e, o, i) => {
        const a = Gl[t];
        return typeof a == "function" ? a(t, e, o, i) : a
    },
    ed = {
        narrow: ["p.n.e.", "n.e."],
        abbreviated: ["p.n.e.", "n.e."],
        wide: ["przed naszą erą", "naszej ery"]
    },
    td = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["I kw.", "II kw.", "III kw.", "IV kw."],
        wide: ["I kwartał", "II kwartał", "III kwartał", "IV kwartał"]
    },
    od = {
        narrow: ["S", "L", "M", "K", "M", "C", "L", "S", "W", "P", "L", "G"],
        abbreviated: ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
        wide: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]
    },
    id = {
        narrow: ["s", "l", "m", "k", "m", "c", "l", "s", "w", "p", "l", "g"],
        abbreviated: ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
        wide: ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]
    },
    ad = {
        narrow: ["N", "P", "W", "Ś", "C", "P", "S"],
        short: ["nie", "pon", "wto", "śro", "czw", "pią", "sob"],
        abbreviated: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
        wide: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
    },
    nd = {
        narrow: ["n", "p", "w", "ś", "c", "p", "s"],
        short: ["nie", "pon", "wto", "śro", "czw", "pią", "sob"],
        abbreviated: ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],
        wide: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
    },
    rd = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "półn.",
            noon: "poł",
            morning: "rano",
            afternoon: "popoł.",
            evening: "wiecz.",
            night: "noc"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "północ",
            noon: "południe",
            morning: "rano",
            afternoon: "popołudnie",
            evening: "wieczór",
            night: "noc"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "północ",
            noon: "południe",
            morning: "rano",
            afternoon: "popołudnie",
            evening: "wieczór",
            night: "noc"
        }
    },
    sd = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "o półn.",
            noon: "w poł.",
            morning: "rano",
            afternoon: "po poł.",
            evening: "wiecz.",
            night: "w nocy"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "o północy",
            noon: "w południe",
            morning: "rano",
            afternoon: "po południu",
            evening: "wieczorem",
            night: "w nocy"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "o północy",
            noon: "w południe",
            morning: "rano",
            afternoon: "po południu",
            evening: "wieczorem",
            night: "w nocy"
        }
    },
    cd = (t, e) => String(t),
    ld = {
        ordinalNumber: cd,
        era: h({
            values: ed,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: td,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: od,
            defaultWidth: "wide",
            formattingValues: id,
            defaultFormattingWidth: "wide"
        }),
        day: h({
            values: ad,
            defaultWidth: "wide",
            formattingValues: nd,
            defaultFormattingWidth: "wide"
        }),
        dayPeriod: h({
            values: rd,
            defaultWidth: "wide",
            formattingValues: sd,
            defaultFormattingWidth: "wide"
        })
    },
    dd = /^(\d+)?/i,
    ud = /\d+/i,
    pd = {
        narrow: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
        abbreviated: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
        wide: /^(przed\s*nasz(ą|a)\s*er(ą|a)|naszej\s*ery)/i
    },
    md = {
        any: [/^p/i, /^n/i]
    },
    hd = {
        narrow: /^[1234]/i,
        abbreviated: /^(I|II|III|IV)\s*kw\.?/i,
        wide: /^(I|II|III|IV)\s*kwarta(ł|l)/i
    },
    fd = {
        narrow: [/1/i, /2/i, /3/i, /4/i],
        any: [/^I kw/i, /^II kw/i, /^III kw/i, /^IV kw/i]
    },
    wd = {
        narrow: /^[slmkcwpg]/i,
        abbreviated: /^(sty|lut|mar|kwi|maj|cze|lip|sie|wrz|pa(ź|z)|lis|gru)/i,
        wide: /^(stycznia|stycze(ń|n)|lutego|luty|marca|marzec|kwietnia|kwiecie(ń|n)|maja|maj|czerwca|czerwiec|lipca|lipiec|sierpnia|sierpie(ń|n)|wrze(ś|s)nia|wrzesie(ń|n)|pa(ź|z)dziernika|pa(ź|z)dziernik|listopada|listopad|grudnia|grudzie(ń|n))/i
    },
    gd = {
        narrow: [/^s/i, /^l/i, /^m/i, /^k/i, /^m/i, /^c/i, /^l/i, /^s/i, /^w/i, /^p/i, /^l/i, /^g/i],
        any: [/^st/i, /^lu/i, /^mar/i, /^k/i, /^maj/i, /^c/i, /^lip/i, /^si/i, /^w/i, /^p/i, /^lis/i, /^g/i]
    },
    yd = {
        narrow: /^[npwścs]/i,
        short: /^(nie|pon|wto|(ś|s)ro|czw|pi(ą|a)|sob)/i,
        abbreviated: /^(niedz|pon|wt|(ś|s)r|czw|pt|sob)\.?/i,
        wide: /^(niedziela|poniedzia(ł|l)ek|wtorek|(ś|s)roda|czwartek|pi(ą|a)tek|sobota)/i
    },
    zd = {
        narrow: [/^n/i, /^p/i, /^w/i, /^ś/i, /^c/i, /^p/i, /^s/i],
        abbreviated: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pt/i, /^so/i],
        any: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pi/i, /^so/i]
    },
    bd = {
        narrow: /^(^a$|^p$|pó(ł|l)n\.?|o\s*pó(ł|l)n\.?|po(ł|l)\.?|w\s*po(ł|l)\.?|po\s*po(ł|l)\.?|rano|wiecz\.?|noc|w\s*nocy)/i,
        any: /^(am|pm|pó(ł|l)noc|o\s*pó(ł|l)nocy|po(ł|l)udnie|w\s*po(ł|l)udnie|popo(ł|l)udnie|po\s*po(ł|l)udniu|rano|wieczór|wieczorem|noc|w\s*nocy)/i
    },
    kd = {
        narrow: {
            am: /^a$/i,
            pm: /^p$/i,
            midnight: /pó(ł|l)n/i,
            noon: /po(ł|l)/i,
            morning: /rano/i,
            afternoon: /po\s*po(ł|l)/i,
            evening: /wiecz/i,
            night: /noc/i
        },
        any: {
            am: /^am/i,
            pm: /^pm/i,
            midnight: /pó(ł|l)n/i,
            noon: /po(ł|l)/i,
            morning: /rano/i,
            afternoon: /po\s*po(ł|l)/i,
            evening: /wiecz/i,
            night: /noc/i
        }
    },
    vd = {
        ordinalNumber: B({
            matchPattern: dd,
            parsePattern: ud,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: pd,
            defaultMatchWidth: "wide",
            parsePatterns: md,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: hd,
            defaultMatchWidth: "wide",
            parsePatterns: fd,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: wd,
            defaultMatchWidth: "wide",
            parsePatterns: gd,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: yd,
            defaultMatchWidth: "wide",
            parsePatterns: zd,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: bd,
            defaultMatchWidth: "any",
            parsePatterns: kd,
            defaultParseWidth: "any"
        })
    },
    _d = {
        code: "pl",
        formatDistance: Fl,
        formatLong: Jl,
        formatRelative: Ql,
        localize: ld,
        match: vd,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    },
    jd = {
        lessThanXSeconds: {
            one: "mai puțin de o secundă",
            other: "mai puțin de {{count}} secunde"
        },
        xSeconds: {
            one: "1 secundă",
            other: "{{count}} secunde"
        },
        halfAMinute: "jumătate de minut",
        lessThanXMinutes: {
            one: "mai puțin de un minut",
            other: "mai puțin de {{count}} minute"
        },
        xMinutes: {
            one: "1 minut",
            other: "{{count}} minute"
        },
        aboutXHours: {
            one: "circa 1 oră",
            other: "circa {{count}} ore"
        },
        xHours: {
            one: "1 oră",
            other: "{{count}} ore"
        },
        xDays: {
            one: "1 zi",
            other: "{{count}} zile"
        },
        aboutXWeeks: {
            one: "circa o săptămână",
            other: "circa {{count}} săptămâni"
        },
        xWeeks: {
            one: "1 săptămână",
            other: "{{count}} săptămâni"
        },
        aboutXMonths: {
            one: "circa 1 lună",
            other: "circa {{count}} luni"
        },
        xMonths: {
            one: "1 lună",
            other: "{{count}} luni"
        },
        aboutXYears: {
            one: "circa 1 an",
            other: "circa {{count}} ani"
        },
        xYears: {
            one: "1 an",
            other: "{{count}} ani"
        },
        overXYears: {
            one: "peste 1 an",
            other: "peste {{count}} ani"
        },
        almostXYears: {
            one: "aproape 1 an",
            other: "aproape {{count}} ani"
        }
    },
    $d = (t, e, o) => {
        let i;
        const a = jd[t];
        return typeof a == "string" ? i = a : e === 1 ? i = a.one : i = a.other.replace("{{count}}", String(e)), o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? "în " + i : i + " în urmă" : i
    },
    Pd = {
        full: "EEEE, d MMMM yyyy",
        long: "d MMMM yyyy",
        medium: "d MMM yyyy",
        short: "dd.MM.yyyy"
    },
    Md = {
        full: "HH:mm:ss zzzz",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    Sd = {
        full: "{{date}} 'la' {{time}}",
        long: "{{date}} 'la' {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}}, {{time}}"
    },
    xd = {
        date: k({
            formats: Pd,
            defaultWidth: "full"
        }),
        time: k({
            formats: Md,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: Sd,
            defaultWidth: "full"
        })
    },
    Ad = {
        lastWeek: "eeee 'trecută la' p",
        yesterday: "'ieri la' p",
        today: "'astăzi la' p",
        tomorrow: "'mâine la' p",
        nextWeek: "eeee 'viitoare la' p",
        other: "P"
    },
    Td = (t, e, o, i) => Ad[t],
    Wd = {
        narrow: ["Î", "D"],
        abbreviated: ["Î.d.C.", "D.C."],
        wide: ["Înainte de Cristos", "După Cristos"]
    },
    Cd = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["T1", "T2", "T3", "T4"],
        wide: ["primul trimestru", "al doilea trimestru", "al treilea trimestru", "al patrulea trimestru"]
    },
    Ed = {
        narrow: ["I", "F", "M", "A", "M", "I", "I", "A", "S", "O", "N", "D"],
        abbreviated: ["ian", "feb", "mar", "apr", "mai", "iun", "iul", "aug", "sep", "oct", "noi", "dec"],
        wide: ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"]
    },
    Dd = {
        narrow: ["d", "l", "m", "m", "j", "v", "s"],
        short: ["du", "lu", "ma", "mi", "jo", "vi", "sâ"],
        abbreviated: ["dum", "lun", "mar", "mie", "joi", "vin", "sâm"],
        wide: ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"]
    },
    Rd = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mn",
            noon: "ami",
            morning: "dim",
            afternoon: "da",
            evening: "s",
            night: "n"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "miezul nopții",
            noon: "amiază",
            morning: "dimineață",
            afternoon: "după-amiază",
            evening: "seară",
            night: "noapte"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "miezul nopții",
            noon: "amiază",
            morning: "dimineață",
            afternoon: "după-amiază",
            evening: "seară",
            night: "noapte"
        }
    },
    Od = {
        narrow: {
            am: "a",
            pm: "p",
            midnight: "mn",
            noon: "amiază",
            morning: "dimineață",
            afternoon: "după-amiază",
            evening: "seară",
            night: "noapte"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "miezul nopții",
            noon: "amiază",
            morning: "dimineață",
            afternoon: "după-amiază",
            evening: "seară",
            night: "noapte"
        },
        wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "miezul nopții",
            noon: "amiază",
            morning: "dimineață",
            afternoon: "după-amiază",
            evening: "seară",
            night: "noapte"
        }
    },
    Ld = (t, e) => String(t),
    Id = {
        ordinalNumber: Ld,
        era: h({
            values: Wd,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: Cd,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: Ed,
            defaultWidth: "wide"
        }),
        day: h({
            values: Dd,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: Rd,
            defaultWidth: "wide",
            formattingValues: Od,
            defaultFormattingWidth: "wide"
        })
    },
    Ud = /^(\d+)?/i,
    Nd = /\d+/i,
    Vd = {
        narrow: /^(Î|D)/i,
        abbreviated: /^(Î\.?\s?d\.?\s?C\.?|Î\.?\s?e\.?\s?n\.?|D\.?\s?C\.?|e\.?\s?n\.?)/i,
        wide: /^(Înainte de Cristos|Înaintea erei noastre|După Cristos|Era noastră)/i
    },
    Fd = {
        any: [/^ÎC/i, /^DC/i],
        wide: [/^(Înainte de Cristos|Înaintea erei noastre)/i, /^(După Cristos|Era noastră)/i]
    },
    Hd = {
        narrow: /^[1234]/i,
        abbreviated: /^T[1234]/i,
        wide: /^trimestrul [1234]/i
    },
    Kd = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    Bd = {
        narrow: /^[ifmaasond]/i,
        abbreviated: /^(ian|feb|mar|apr|mai|iun|iul|aug|sep|oct|noi|dec)/i,
        wide: /^(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)/i
    },
    Jd = {
        narrow: [/^i/i, /^f/i, /^m/i, /^a/i, /^m/i, /^i/i, /^i/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^ia/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^iun/i, /^iul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    qd = {
        narrow: /^[dlmjvs]/i,
        short: /^(d|l|ma|mi|j|v|s)/i,
        abbreviated: /^(dum|lun|mar|mie|jo|vi|sâ)/i,
        wide: /^(duminica|luni|marţi|miercuri|joi|vineri|sâmbătă)/i
    },
    Zd = {
        narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
        any: [/^d/i, /^l/i, /^ma/i, /^mi/i, /^j/i, /^v/i, /^s/i]
    },
    Xd = {
        narrow: /^(a|p|mn|a|(dimineaţa|după-amiaza|seara|noaptea))/i,
        any: /^([ap]\.?\s?m\.?|miezul nopții|amiaza|(dimineaţa|după-amiaza|seara|noaptea))/i
    },
    Yd = {
        any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mn/i,
            noon: /amiaza/i,
            morning: /dimineaţa/i,
            afternoon: /după-amiaza/i,
            evening: /seara/i,
            night: /noaptea/i
        }
    },
    Gd = {
        ordinalNumber: B({
            matchPattern: Ud,
            parsePattern: Nd,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: Vd,
            defaultMatchWidth: "wide",
            parsePatterns: Fd,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: Hd,
            defaultMatchWidth: "wide",
            parsePatterns: Kd,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: Bd,
            defaultMatchWidth: "wide",
            parsePatterns: Jd,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: qd,
            defaultMatchWidth: "wide",
            parsePatterns: Zd,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: Xd,
            defaultMatchWidth: "any",
            parsePatterns: Yd,
            defaultParseWidth: "any"
        })
    },
    Qd = {
        code: "ro",
        formatDistance: $d,
        formatLong: xd,
        formatRelative: Td,
        localize: Id,
        match: Gd,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 1
        }
    };

function eu(t, e) {
    return e === 1 && t.one ? t.one : e >= 2 && e <= 4 && t.twoFour ? t.twoFour : t.other
}

function zt(t, e, o) {
    return eu(t, e)[o].replace("{{count}}", String(e))
}

function tu(t) {
    return ["lessThan", "about", "over", "almost"].filter(function(o) {
        return !!t.match(new RegExp("^" + o))
    })[0]
}

function bt(t) {
    let e = "";
    return t === "almost" && (e = "takmer"), t === "about" && (e = "približne"), e.length > 0 ? e + " " : ""
}

function kt(t) {
    let e = "";
    return t === "lessThan" && (e = "menej než"), t === "over" && (e = "viac než"), e.length > 0 ? e + " " : ""
}

function ou(t) {
    return t.charAt(0).toLowerCase() + t.slice(1)
}
const iu = {
        xSeconds: {
            one: {
                present: "sekunda",
                past: "sekundou",
                future: "sekundu"
            },
            twoFour: {
                present: "{{count}} sekundy",
                past: "{{count}} sekundami",
                future: "{{count}} sekundy"
            },
            other: {
                present: "{{count}} sekúnd",
                past: "{{count}} sekundami",
                future: "{{count}} sekúnd"
            }
        },
        halfAMinute: {
            other: {
                present: "pol minúty",
                past: "pol minútou",
                future: "pol minúty"
            }
        },
        xMinutes: {
            one: {
                present: "minúta",
                past: "minútou",
                future: "minútu"
            },
            twoFour: {
                present: "{{count}} minúty",
                past: "{{count}} minútami",
                future: "{{count}} minúty"
            },
            other: {
                present: "{{count}} minút",
                past: "{{count}} minútami",
                future: "{{count}} minút"
            }
        },
        xHours: {
            one: {
                present: "hodina",
                past: "hodinou",
                future: "hodinu"
            },
            twoFour: {
                present: "{{count}} hodiny",
                past: "{{count}} hodinami",
                future: "{{count}} hodiny"
            },
            other: {
                present: "{{count}} hodín",
                past: "{{count}} hodinami",
                future: "{{count}} hodín"
            }
        },
        xDays: {
            one: {
                present: "deň",
                past: "dňom",
                future: "deň"
            },
            twoFour: {
                present: "{{count}} dni",
                past: "{{count}} dňami",
                future: "{{count}} dni"
            },
            other: {
                present: "{{count}} dní",
                past: "{{count}} dňami",
                future: "{{count}} dní"
            }
        },
        xWeeks: {
            one: {
                present: "týždeň",
                past: "týždňom",
                future: "týždeň"
            },
            twoFour: {
                present: "{{count}} týždne",
                past: "{{count}} týždňami",
                future: "{{count}} týždne"
            },
            other: {
                present: "{{count}} týždňov",
                past: "{{count}} týždňami",
                future: "{{count}} týždňov"
            }
        },
        xMonths: {
            one: {
                present: "mesiac",
                past: "mesiacom",
                future: "mesiac"
            },
            twoFour: {
                present: "{{count}} mesiace",
                past: "{{count}} mesiacmi",
                future: "{{count}} mesiace"
            },
            other: {
                present: "{{count}} mesiacov",
                past: "{{count}} mesiacmi",
                future: "{{count}} mesiacov"
            }
        },
        xYears: {
            one: {
                present: "rok",
                past: "rokom",
                future: "rok"
            },
            twoFour: {
                present: "{{count}} roky",
                past: "{{count}} rokmi",
                future: "{{count}} roky"
            },
            other: {
                present: "{{count}} rokov",
                past: "{{count}} rokmi",
                future: "{{count}} rokov"
            }
        }
    },
    au = (t, e, o) => {
        const i = tu(t) || "",
            a = ou(t.substring(i.length)),
            r = iu[a];
        return o != null && o.addSuffix ? o.comparison && o.comparison > 0 ? bt(i) + "o " + kt(i) + zt(r, e, "future") : bt(i) + "pred " + kt(i) + zt(r, e, "past") : bt(i) + kt(i) + zt(r, e, "present")
    },
    nu = {
        full: "EEEE d. MMMM y",
        long: "d. MMMM y",
        medium: "d. M. y",
        short: "d. M. y"
    },
    ru = {
        full: "H:mm:ss zzzz",
        long: "H:mm:ss z",
        medium: "H:mm:ss",
        short: "H:mm"
    },
    su = {
        full: "{{date}}, {{time}}",
        long: "{{date}}, {{time}}",
        medium: "{{date}}, {{time}}",
        short: "{{date}} {{time}}"
    },
    cu = {
        date: k({
            formats: nu,
            defaultWidth: "full"
        }),
        time: k({
            formats: ru,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: su,
            defaultWidth: "full"
        })
    },
    Rt = ["nedeľu", "pondelok", "utorok", "stredu", "štvrtok", "piatok", "sobotu"];

function lu(t) {
    const e = Rt[t];
    switch (t) {
        case 0:
        case 3:
        case 6:
            return "'minulú " + e + " o' p";
        default:
            return "'minulý' eeee 'o' p"
    }
}

function Mo(t) {
    const e = Rt[t];
    return t === 4 ? "'vo' eeee 'o' p" : "'v " + e + " o' p"
}

function du(t) {
    const e = Rt[t];
    switch (t) {
        case 0:
        case 4:
        case 6:
            return "'budúcu " + e + " o' p";
        default:
            return "'budúci' eeee 'o' p"
    }
}
const uu = {
        lastWeek: (t, e, o) => {
            const i = t.getDay();
            return Oe(t, e, o) ? Mo(i) : lu(i)
        },
        yesterday: "'včera o' p",
        today: "'dnes o' p",
        tomorrow: "'zajtra o' p",
        nextWeek: (t, e, o) => {
            const i = t.getDay();
            return Oe(t, e, o) ? Mo(i) : du(i)
        },
        other: "P"
    },
    pu = (t, e, o, i) => {
        const a = uu[t];
        return typeof a == "function" ? a(e, o, i) : a
    },
    mu = {
        narrow: ["pred Kr.", "po Kr."],
        abbreviated: ["pred Kr.", "po Kr."],
        wide: ["pred Kristom", "po Kristovi"]
    },
    hu = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["Q1", "Q2", "Q3", "Q4"],
        wide: ["1. štvrťrok", "2. štvrťrok", "3. štvrťrok", "4. štvrťrok"]
    },
    fu = {
        narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
        abbreviated: ["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec"],
        wide: ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"]
    },
    wu = {
        narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
        abbreviated: ["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec"],
        wide: ["januára", "februára", "marca", "apríla", "mája", "júna", "júla", "augusta", "septembra", "októbra", "novembra", "decembra"]
    },
    gu = {
        narrow: ["n", "p", "u", "s", "š", "p", "s"],
        short: ["ne", "po", "ut", "st", "št", "pi", "so"],
        abbreviated: ["ne", "po", "ut", "st", "št", "pi", "so"],
        wide: ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"]
    },
    yu = {
        narrow: {
            am: "AM",
            pm: "PM",
            midnight: "poln.",
            noon: "pol.",
            morning: "ráno",
            afternoon: "pop.",
            evening: "več.",
            night: "noc"
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "poln.",
            noon: "pol.",
            morning: "ráno",
            afternoon: "popol.",
            evening: "večer",
            night: "noc"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "polnoc",
            noon: "poludnie",
            morning: "ráno",
            afternoon: "popoludnie",
            evening: "večer",
            night: "noc"
        }
    },
    zu = {
        narrow: {
            am: "AM",
            pm: "PM",
            midnight: "o poln.",
            noon: "nap.",
            morning: "ráno",
            afternoon: "pop.",
            evening: "več.",
            night: "v n."
        },
        abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "o poln.",
            noon: "napol.",
            morning: "ráno",
            afternoon: "popol.",
            evening: "večer",
            night: "v noci"
        },
        wide: {
            am: "AM",
            pm: "PM",
            midnight: "o polnoci",
            noon: "napoludnie",
            morning: "ráno",
            afternoon: "popoludní",
            evening: "večer",
            night: "v noci"
        }
    },
    bu = (t, e) => Number(t) + ".",
    ku = {
        ordinalNumber: bu,
        era: h({
            values: mu,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: hu,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: fu,
            defaultWidth: "wide",
            formattingValues: wu,
            defaultFormattingWidth: "wide"
        }),
        day: h({
            values: gu,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: yu,
            defaultWidth: "wide",
            formattingValues: zu,
            defaultFormattingWidth: "wide"
        })
    },
    vu = /^(\d+)\.?/i,
    _u = /\d+/i,
    ju = {
        narrow: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
        abbreviated: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
        wide: /^(pred Kristom|pred na[šs][íi]m letopo[čc]tom|po Kristovi|n[áa][šs]ho letopo[čc]tu)/i
    },
    $u = {
        any: [/^pr/i, /^(po|n)/i]
    },
    Pu = {
        narrow: /^[1234]/i,
        abbreviated: /^q[1234]/i,
        wide: /^[1234]\. [šs]tvr[ťt]rok/i
    },
    Mu = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    Su = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan|feb|mar|apr|m[áa]j|j[úu]n|j[úu]l|aug|sep|okt|nov|dec)/i,
        wide: /^(janu[áa]ra?|febru[áa]ra?|(marec|marca)|apr[íi]la?|m[áa]ja?|j[úu]na?|j[úu]la?|augusta?|(september|septembra)|(okt[óo]ber|okt[óo]bra)|(november|novembra)|(december|decembra))/i
    },
    xu = {
        narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^m[áa]j/i, /^j[úu]n/i, /^j[úu]l/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    Au = {
        narrow: /^[npusšp]/i,
        short: /^(ne|po|ut|st|št|pi|so)/i,
        abbreviated: /^(ne|po|ut|st|št|pi|so)/i,
        wide: /^(nede[ľl]a|pondelok|utorok|streda|[šs]tvrtok|piatok|sobota])/i
    },
    Tu = {
        narrow: [/^n/i, /^p/i, /^u/i, /^s/i, /^š/i, /^p/i, /^s/i],
        any: [/^n/i, /^po/i, /^u/i, /^st/i, /^(št|stv)/i, /^pi/i, /^so/i]
    },
    Wu = {
        narrow: /^(am|pm|(o )?poln\.?|(nap\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]\.?|(v n\.?|noc))/i,
        abbreviated: /^(am|pm|(o )?poln\.?|(napol\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]er|(v )?noci?)/i,
        any: /^(am|pm|(o )?polnoci?|(na)?poludnie|r[áa]no|popoludn(ie|í|i)|ve[čc]er|(v )?noci?)/i
    },
    Cu = {
        any: {
            am: /^am/i,
            pm: /^pm/i,
            midnight: /poln/i,
            noon: /^(nap|(na)?pol(\.|u))/i,
            morning: /^r[áa]no/i,
            afternoon: /^pop/i,
            evening: /^ve[čc]/i,
            night: /^(noc|v n\.)/i
        }
    },
    Eu = {
        ordinalNumber: B({
            matchPattern: vu,
            parsePattern: _u,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: ju,
            defaultMatchWidth: "wide",
            parsePatterns: $u,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: Pu,
            defaultMatchWidth: "wide",
            parsePatterns: Mu,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: Su,
            defaultMatchWidth: "wide",
            parsePatterns: xu,
            defaultParseWidth: "any"
        }),
        day: f({
            matchPatterns: Au,
            defaultMatchWidth: "wide",
            parsePatterns: Tu,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: Wu,
            defaultMatchWidth: "any",
            parsePatterns: Cu,
            defaultParseWidth: "any"
        })
    },
    Du = {
        code: "sk",
        formatDistance: au,
        formatLong: cu,
        formatRelative: pu,
        localize: ku,
        match: Eu,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
        }
    };

function Ru(t) {
    return t.one !== void 0
}
const Ou = {
    lessThanXSeconds: {
        present: {
            one: "manj kot {{count}} sekunda",
            two: "manj kot {{count}} sekundi",
            few: "manj kot {{count}} sekunde",
            other: "manj kot {{count}} sekund"
        },
        past: {
            one: "manj kot {{count}} sekundo",
            two: "manj kot {{count}} sekundama",
            few: "manj kot {{count}} sekundami",
            other: "manj kot {{count}} sekundami"
        },
        future: {
            one: "manj kot {{count}} sekundo",
            two: "manj kot {{count}} sekundi",
            few: "manj kot {{count}} sekunde",
            other: "manj kot {{count}} sekund"
        }
    },
    xSeconds: {
        present: {
            one: "{{count}} sekunda",
            two: "{{count}} sekundi",
            few: "{{count}} sekunde",
            other: "{{count}} sekund"
        },
        past: {
            one: "{{count}} sekundo",
            two: "{{count}} sekundama",
            few: "{{count}} sekundami",
            other: "{{count}} sekundami"
        },
        future: {
            one: "{{count}} sekundo",
            two: "{{count}} sekundi",
            few: "{{count}} sekunde",
            other: "{{count}} sekund"
        }
    },
    halfAMinute: "pol minute",
    lessThanXMinutes: {
        present: {
            one: "manj kot {{count}} minuta",
            two: "manj kot {{count}} minuti",
            few: "manj kot {{count}} minute",
            other: "manj kot {{count}} minut"
        },
        past: {
            one: "manj kot {{count}} minuto",
            two: "manj kot {{count}} minutama",
            few: "manj kot {{count}} minutami",
            other: "manj kot {{count}} minutami"
        },
        future: {
            one: "manj kot {{count}} minuto",
            two: "manj kot {{count}} minuti",
            few: "manj kot {{count}} minute",
            other: "manj kot {{count}} minut"
        }
    },
    xMinutes: {
        present: {
            one: "{{count}} minuta",
            two: "{{count}} minuti",
            few: "{{count}} minute",
            other: "{{count}} minut"
        },
        past: {
            one: "{{count}} minuto",
            two: "{{count}} minutama",
            few: "{{count}} minutami",
            other: "{{count}} minutami"
        },
        future: {
            one: "{{count}} minuto",
            two: "{{count}} minuti",
            few: "{{count}} minute",
            other: "{{count}} minut"
        }
    },
    aboutXHours: {
        present: {
            one: "približno {{count}} ura",
            two: "približno {{count}} uri",
            few: "približno {{count}} ure",
            other: "približno {{count}} ur"
        },
        past: {
            one: "približno {{count}} uro",
            two: "približno {{count}} urama",
            few: "približno {{count}} urami",
            other: "približno {{count}} urami"
        },
        future: {
            one: "približno {{count}} uro",
            two: "približno {{count}} uri",
            few: "približno {{count}} ure",
            other: "približno {{count}} ur"
        }
    },
    xHours: {
        present: {
            one: "{{count}} ura",
            two: "{{count}} uri",
            few: "{{count}} ure",
            other: "{{count}} ur"
        },
        past: {
            one: "{{count}} uro",
            two: "{{count}} urama",
            few: "{{count}} urami",
            other: "{{count}} urami"
        },
        future: {
            one: "{{count}} uro",
            two: "{{count}} uri",
            few: "{{count}} ure",
            other: "{{count}} ur"
        }
    },
    xDays: {
        present: {
            one: "{{count}} dan",
            two: "{{count}} dni",
            few: "{{count}} dni",
            other: "{{count}} dni"
        },
        past: {
            one: "{{count}} dnem",
            two: "{{count}} dnevoma",
            few: "{{count}} dnevi",
            other: "{{count}} dnevi"
        },
        future: {
            one: "{{count}} dan",
            two: "{{count}} dni",
            few: "{{count}} dni",
            other: "{{count}} dni"
        }
    },
    aboutXWeeks: {
        one: "približno {{count}} teden",
        two: "približno {{count}} tedna",
        few: "približno {{count}} tedne",
        other: "približno {{count}} tednov"
    },
    xWeeks: {
        one: "{{count}} teden",
        two: "{{count}} tedna",
        few: "{{count}} tedne",
        other: "{{count}} tednov"
    },
    aboutXMonths: {
        present: {
            one: "približno {{count}} mesec",
            two: "približno {{count}} meseca",
            few: "približno {{count}} mesece",
            other: "približno {{count}} mesecev"
        },
        past: {
            one: "približno {{count}} mesecem",
            two: "približno {{count}} mesecema",
            few: "približno {{count}} meseci",
            other: "približno {{count}} meseci"
        },
        future: {
            one: "približno {{count}} mesec",
            two: "približno {{count}} meseca",
            few: "približno {{count}} mesece",
            other: "približno {{count}} mesecev"
        }
    },
    xMonths: {
        present: {
            one: "{{count}} mesec",
            two: "{{count}} meseca",
            few: "{{count}} meseci",
            other: "{{count}} mesecev"
        },
        past: {
            one: "{{count}} mesecem",
            two: "{{count}} mesecema",
            few: "{{count}} meseci",
            other: "{{count}} meseci"
        },
        future: {
            one: "{{count}} mesec",
            two: "{{count}} meseca",
            few: "{{count}} mesece",
            other: "{{count}} mesecev"
        }
    },
    aboutXYears: {
        present: {
            one: "približno {{count}} leto",
            two: "približno {{count}} leti",
            few: "približno {{count}} leta",
            other: "približno {{count}} let"
        },
        past: {
            one: "približno {{count}} letom",
            two: "približno {{count}} letoma",
            few: "približno {{count}} leti",
            other: "približno {{count}} leti"
        },
        future: {
            one: "približno {{count}} leto",
            two: "približno {{count}} leti",
            few: "približno {{count}} leta",
            other: "približno {{count}} let"
        }
    },
    xYears: {
        present: {
            one: "{{count}} leto",
            two: "{{count}} leti",
            few: "{{count}} leta",
            other: "{{count}} let"
        },
        past: {
            one: "{{count}} letom",
            two: "{{count}} letoma",
            few: "{{count}} leti",
            other: "{{count}} leti"
        },
        future: {
            one: "{{count}} leto",
            two: "{{count}} leti",
            few: "{{count}} leta",
            other: "{{count}} let"
        }
    },
    overXYears: {
        present: {
            one: "več kot {{count}} leto",
            two: "več kot {{count}} leti",
            few: "več kot {{count}} leta",
            other: "več kot {{count}} let"
        },
        past: {
            one: "več kot {{count}} letom",
            two: "več kot {{count}} letoma",
            few: "več kot {{count}} leti",
            other: "več kot {{count}} leti"
        },
        future: {
            one: "več kot {{count}} leto",
            two: "več kot {{count}} leti",
            few: "več kot {{count}} leta",
            other: "več kot {{count}} let"
        }
    },
    almostXYears: {
        present: {
            one: "skoraj {{count}} leto",
            two: "skoraj {{count}} leti",
            few: "skoraj {{count}} leta",
            other: "skoraj {{count}} let"
        },
        past: {
            one: "skoraj {{count}} letom",
            two: "skoraj {{count}} letoma",
            few: "skoraj {{count}} leti",
            other: "skoraj {{count}} leti"
        },
        future: {
            one: "skoraj {{count}} leto",
            two: "skoraj {{count}} leti",
            few: "skoraj {{count}} leta",
            other: "skoraj {{count}} let"
        }
    }
};

function Lu(t) {
    switch (t % 100) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
        case 4:
            return "few";
        default:
            return "other"
    }
}
const Iu = (t, e, o) => {
        let i = "",
            a = "present";
        o != null && o.addSuffix && (o.comparison && o.comparison > 0 ? (a = "future", i = "čez ") : (a = "past", i = "pred "));
        const r = Ou[t];
        if (typeof r == "string") i += r;
        else {
            const s = Lu(e);
            Ru(r) ? i += r[s].replace("{{count}}", String(e)) : i += r[a][s].replace("{{count}}", String(e))
        }
        return i
    },
    Uu = {
        full: "EEEE, dd. MMMM y",
        long: "dd. MMMM y",
        medium: "d. MMM y",
        short: "d. MM. yy"
    },
    Nu = {
        full: "HH:mm:ss zzzz",
        long: "HH:mm:ss z",
        medium: "HH:mm:ss",
        short: "HH:mm"
    },
    Vu = {
        full: "{{date}} {{time}}",
        long: "{{date}} {{time}}",
        medium: "{{date}} {{time}}",
        short: "{{date}} {{time}}"
    },
    Fu = {
        date: k({
            formats: Uu,
            defaultWidth: "full"
        }),
        time: k({
            formats: Nu,
            defaultWidth: "full"
        }),
        dateTime: k({
            formats: Vu,
            defaultWidth: "full"
        })
    },
    Hu = {
        lastWeek: t => {
            switch (t.getDay()) {
                case 0:
                    return "'prejšnjo nedeljo ob' p";
                case 3:
                    return "'prejšnjo sredo ob' p";
                case 6:
                    return "'prejšnjo soboto ob' p";
                default:
                    return "'prejšnji' EEEE 'ob' p"
            }
        },
        yesterday: "'včeraj ob' p",
        today: "'danes ob' p",
        tomorrow: "'jutri ob' p",
        nextWeek: t => {
            switch (t.getDay()) {
                case 0:
                    return "'naslednjo nedeljo ob' p";
                case 3:
                    return "'naslednjo sredo ob' p";
                case 6:
                    return "'naslednjo soboto ob' p";
                default:
                    return "'naslednji' EEEE 'ob' p"
            }
        },
        other: "P"
    },
    Ku = (t, e, o, i) => {
        const a = Hu[t];
        return typeof a == "function" ? a(e) : a
    },
    Bu = {
        narrow: ["pr. n. št.", "po n. št."],
        abbreviated: ["pr. n. št.", "po n. št."],
        wide: ["pred našim štetjem", "po našem štetju"]
    },
    Ju = {
        narrow: ["1", "2", "3", "4"],
        abbreviated: ["1. čet.", "2. čet.", "3. čet.", "4. čet."],
        wide: ["1. četrtletje", "2. četrtletje", "3. četrtletje", "4. četrtletje"]
    },
    qu = {
        narrow: ["j", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
        abbreviated: ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec."],
        wide: ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"]
    },
    Zu = {
        narrow: ["n", "p", "t", "s", "č", "p", "s"],
        short: ["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."],
        abbreviated: ["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."],
        wide: ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"]
    },
    Xu = {
        narrow: {
            am: "d",
            pm: "p",
            midnight: "24.00",
            noon: "12.00",
            morning: "j",
            afternoon: "p",
            evening: "v",
            night: "n"
        },
        abbreviated: {
            am: "dop.",
            pm: "pop.",
            midnight: "poln.",
            noon: "pold.",
            morning: "jut.",
            afternoon: "pop.",
            evening: "več.",
            night: "noč"
        },
        wide: {
            am: "dop.",
            pm: "pop.",
            midnight: "polnoč",
            noon: "poldne",
            morning: "jutro",
            afternoon: "popoldne",
            evening: "večer",
            night: "noč"
        }
    },
    Yu = {
        narrow: {
            am: "d",
            pm: "p",
            midnight: "24.00",
            noon: "12.00",
            morning: "zj",
            afternoon: "p",
            evening: "zv",
            night: "po"
        },
        abbreviated: {
            am: "dop.",
            pm: "pop.",
            midnight: "opoln.",
            noon: "opold.",
            morning: "zjut.",
            afternoon: "pop.",
            evening: "zveč.",
            night: "ponoči"
        },
        wide: {
            am: "dop.",
            pm: "pop.",
            midnight: "opolnoči",
            noon: "opoldne",
            morning: "zjutraj",
            afternoon: "popoldan",
            evening: "zvečer",
            night: "ponoči"
        }
    },
    Gu = (t, e) => Number(t) + ".",
    Qu = {
        ordinalNumber: Gu,
        era: h({
            values: Bu,
            defaultWidth: "wide"
        }),
        quarter: h({
            values: Ju,
            defaultWidth: "wide",
            argumentCallback: t => t - 1
        }),
        month: h({
            values: qu,
            defaultWidth: "wide"
        }),
        day: h({
            values: Zu,
            defaultWidth: "wide"
        }),
        dayPeriod: h({
            values: Xu,
            defaultWidth: "wide",
            formattingValues: Yu,
            defaultFormattingWidth: "wide"
        })
    },
    ep = /^(\d+)\./i,
    tp = /\d+/i,
    op = {
        abbreviated: /^(pr\. n\. št\.|po n\. št\.)/i,
        wide: /^(pred Kristusom|pred na[sš]im [sš]tetjem|po Kristusu|po na[sš]em [sš]tetju|na[sš]ega [sš]tetja)/i
    },
    ip = {
        any: [/^pr/i, /^(po|na[sš]em)/i]
    },
    ap = {
        narrow: /^[1234]/i,
        abbreviated: /^[1234]\.\s?[čc]et\.?/i,
        wide: /^[1234]\. [čc]etrtletje/i
    },
    np = {
        any: [/1/i, /2/i, /3/i, /4/i]
    },
    rp = {
        narrow: /^[jfmasond]/i,
        abbreviated: /^(jan\.|feb\.|mar\.|apr\.|maj|jun\.|jul\.|avg\.|sep\.|okt\.|nov\.|dec\.)/i,
        wide: /^(januar|februar|marec|april|maj|junij|julij|avgust|september|oktober|november|december)/i
    },
    sp = {
        narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
        abbreviated: [/^ja/i, /^fe/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i],
        wide: [/^ja/i, /^fe/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i]
    },
    cp = {
        narrow: /^[nptsčc]/i,
        short: /^(ned\.|pon\.|tor\.|sre\.|[cč]et\.|pet\.|sob\.)/i,
        abbreviated: /^(ned\.|pon\.|tor\.|sre\.|[cč]et\.|pet\.|sob\.)/i,
        wide: /^(nedelja|ponedeljek|torek|sreda|[cč]etrtek|petek|sobota)/i
    },
    lp = {
        narrow: [/^n/i, /^p/i, /^t/i, /^s/i, /^[cč]/i, /^p/i, /^s/i],
        any: [/^n/i, /^po/i, /^t/i, /^sr/i, /^[cč]/i, /^pe/i, /^so/i]
    },
    dp = {
        narrow: /^(d|po?|z?v|n|z?j|24\.00|12\.00)/i,
        any: /^(dop\.|pop\.|o?poln(\.|o[cč]i?)|o?pold(\.|ne)|z?ve[cč](\.|er)|(po)?no[cč]i?|popold(ne|an)|jut(\.|ro)|zjut(\.|raj))/i
    },
    up = {
        narrow: {
            am: /^d/i,
            pm: /^p/i,
            midnight: /^24/i,
            noon: /^12/i,
            morning: /^(z?j)/i,
            afternoon: /^p/i,
            evening: /^(z?v)/i,
            night: /^(n|po)/i
        },
        any: {
            am: /^dop\./i,
            pm: /^pop\./i,
            midnight: /^o?poln/i,
            noon: /^o?pold/i,
            morning: /j/i,
            afternoon: /^pop\./i,
            evening: /^z?ve/i,
            night: /(po)?no/i
        }
    },
    pp = {
        ordinalNumber: B({
            matchPattern: ep,
            parsePattern: tp,
            valueCallback: t => parseInt(t, 10)
        }),
        era: f({
            matchPatterns: op,
            defaultMatchWidth: "wide",
            parsePatterns: ip,
            defaultParseWidth: "any"
        }),
        quarter: f({
            matchPatterns: ap,
            defaultMatchWidth: "wide",
            parsePatterns: np,
            defaultParseWidth: "any",
            valueCallback: t => t + 1
        }),
        month: f({
            matchPatterns: rp,
            defaultMatchWidth: "wide",
            parsePatterns: sp,
            defaultParseWidth: "wide"
        }),
        day: f({
            matchPatterns: cp,
            defaultMatchWidth: "wide",
            parsePatterns: lp,
            defaultParseWidth: "any"
        }),
        dayPeriod: f({
            matchPatterns: dp,
            defaultMatchWidth: "any",
            parsePatterns: up,
            defaultParseWidth: "any"
        })
    },
    mp = {
        code: "sl",
        formatDistance: Iu,
        formatLong: Fu,
        formatRelative: Ku,
        localize: Qu,
        match: pp,
        options: {
            weekStartsOn: 1,
            firstWeekContainsDate: 1
        }
    };
var di = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let it = class extends j {
    constructor() {
        super(...arguments), this.type = "buys"
    }
    render() {
        const e = [n("Rafał"), n("Łukasz"), n("Marek"), n("Ryszard"), n("Tomasz"), n("Bogdan"), n("Daniel"), n("Marcin"), n("Michał"), n("Jarosław"), n("Grzegorz"), n("Bartłomiej"), n("Wojciech"), n("Paweł"), n("Patrycja"), n("Ilona"), n("Aniela"), n("Marzena"), n("Joanna"), n("Anna"), n("Maria"), n("Adrianna"), n("Marianna"), n("Małgorzata"), n("Katarzyna"), n("Grażyna"), n("Daniela"), n("Weronika"), n("Anna"), n("Monika"), n("Hanna"), n("Natalia"), n("Karolina"), n("Agnieszka"), n("Agata"), n("Łucja"), n("Urszula"), n("Renata"), n("Olga"), n("Gabriela")],
            o = [n("Katowice"), n("Rabka"), n("Białystok"), n("Wrocław"), n("Gdańsk"), n("Leszno"), n("Kołobrzeg"), n("Kalisz"), n("Elbląg"), n("Krosno"), n("Zgorzelec"), n("Kielce"), n("Skierniewice"), n("Szydłów"), n("Łódź"), n("Lubiąż"), n("Poznań"), n("Kraków"), n("Wrocław"), n("Radomsko"), n("Suwałki"), n("Łódź"), n("Częstochowa"), n("Żyrardów"), n("Ełk"), n("Jasło"), n("Radom"), n("Kalisz"), n("Warszawa"), n("Ząbki"), n("Oświęcim"), n("Ciechanów"), n("Malbork"), n("Szczecin"), n("Gdynia"), n("Bytom")],
            i = [{
                review: n("Jest cudownie! Po problemie nie ma śladu, a mi wróciła radość życia…"),
                name: n("Monika"),
                city: n("Wrocław")
            }, {
                review: n("Czuję się, jakby ktoś podarował mi nowe życie… Rodzina mnie nie poznaje – tyle we mnie optymizmu. Dziękuję."),
                name: n("Anna"),
                city: n("Kraków")
            }, {
                review: n("Rzadko piszę opinie w Internecie, ale teraz po prostu muszę. Ten produkt zwyczajnie wymiata. Tu się nie ma co zastanawiać!"),
                name: n("Weronika"),
                city: n("Poznań")
            }, {
                review: n("Tę kurację po prostu trzeba mieć. Wcześniej męczyłam się z jakimiś chemicznymi dziadostwami… A tutaj nie dość, że produkt jest naturalny i bezpieczny dla zdrowia, to jeszcze działa lepiej, niż tamte wszystkie razem wzięte."),
                name: n("Daniela"),
                city: n("Lubiąż")
            }, {
                review: n("Moja szwagierka miała rację! To jedyna metoda, która działa naprawdę."),
                name: n("Grażyna"),
                city: n("Łódź")
            }, {
                review: n("Ta kuracja przywróciła mi wiarę w siebie. To wspaniałe uczucie!"),
                name: n("Katarzyna"),
                city: n("Szydłów")
            }, {
                review: n("Ja w cuda nie wierzę i ufam tylko naukowo sprawdzonym metodom. Spróbowałem – i wyniki przerosły moje oczekiwania! Żadna inna metoda nie zapewnia takiej skuteczności."),
                name: n("Łukasz"),
                city: n("Skierniewice")
            }, {
                review: n("To niesamowite, że tak prosta metoda działa takie cuda! I to w niecały miesiąc. Polecam każdemu."),
                name: n("Małgorzata"),
                city: n("Kielce")
            }, {
                review: n("Gdybym wiedziała, że to takie proste, już dawno bym skorzystała. Cyk – i po problemie! Polecam wszystkim, którzy już dawno stracili nadzieję, że coś im pomoże."),
                name: n("Marianna"),
                city: n("Zgorzelec")
            }, {
                review: n("Jak dla mnie – to odkrycie zasługuje na Nobla. Zaledwie kilka tygodni, a efekty powalające!"),
                name: n("Adrianna"),
                city: n("Krosno")
            }, {
                review: n("Ja już jestem pół roku po kuracji i polecam – efekty są trwałe."),
                name: n("Maria"),
                city: n("Elbląg")
            }, {
                review: n("Skuteczność + szybkość + bezpieczeństwo. Takie połączenia lubię! Super rozwiązanie, jak ktoś szuka sprawdzonej i skutecznej metody."),
                name: n("Rafał"),
                city: n("Kalisz")
            }, {
                review: n("Mówiąc szczerze to nie wierzyłam, że naturalna metoda może być tak skuteczna. Spróbowałam i… szok! Rezultaty powalające, a ja jestem w siódmym niebie."),
                name: n("Anna"),
                city: n("Kołobrzeg")
            }, {
                review: n("Świetna metoda dla osób, które oczekują prawdziwego działania, a nie tylko czczych obietnic. Już po zaledwie 2 tygodniach czułam się jak nowa kobieta. Polecam z całego serca!"),
                name: n("Joanna"),
                city: n("Leszno")
            }, {
                review: n("Tę kurację dostałam w prezencie od starszej siostry i na początku nie wierzyłam, że może być aż tak potężna. Ale co mi szkodziło spróbować? Po 3 tygodniach trzeba było widzieć moją minę, jak bardzo się zdziwiłam. Rewelacja!"),
                name: n("Marzena"),
                city: n("Wrocław")
            }, {
                review: n("Jeszcze miesiąc temu byłam rozgoryczona nieskutecznymi kuracjami. Dziś mam ochotę tańczyć z radości! Nigdy nie czułam się tak dobrze. Jestem ogromnie wdzięczna."),
                name: n("Aniela"),
                city: n("Białystok")
            }, {
                review: n("Wiecie, co mi się najbardziej podoba? To, że ta kuracja nie tylko działa cuda, ale jest w 100% bezpieczna. Nie daje więc skutków ubocznych. "),
                name: n("Ilona"),
                city: n("Rabka")
            }, {
                review: n("DZIĘKUJĘ, DZIĘKUJĘ, DZIĘKUJĘ! Czuję się wspaniale, jak nowo narodzona. Poleciłam już siostrze, przyjaciółce, a nawet kuzynowi."),
                name: n("Patrycja"),
                city: n("Katowice")
            }],
            a = i[Math.floor(Math.random() * i.length)];
        return c `
      <div class="toast">
        <div class="toast__inner">
          ${this.type==="views"?c`
                <div class="toast__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path
                      fill-rule="evenodd"
                      d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              `:m}
          ${this.type==="buys"?c`
                <div class="toast__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                </div>
              `:m}
          ${this.type==="reviews"?c`
                <div class="toast__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              `:m}

          <div class="toast__text">
            ${this.type==="buys"?c` <p class="toast__desc">
                    ${n("Ostatnie zamówienia")}<br class="toast__br" /><span
                      class="toast__time"
                      >${this._getRandomTimeAgo()}</span
                    >
                  </p>
                  <p class="toast__title">
                    ${this._getRandomItemFromArray(e)},
                    ${this._getRandomItemFromArray(o)}
                  </p>`:m}
            ${this.type==="reviews"?c` <p class="toast__desc">${a.review}</p>
                  <p class="toast__title">
                    ${a.name}, ${a.city}
                  </p>`:m}
            ${this.type==="views"?c`
                  <p class="toast__desc">
                    ${this.getRandomNumber()}
                    <span>${n("osób ogląda stronę")}</span>
                  </p>
                `:m}
          </div>
        </div>
      </div>
    `
    }
    _getRandomTimeAgo() {
        const e = {
                cs: hr,
                deAT: qr,
                de: Ir,
                et: Gs,
                es: $s,
                hr: xc,
                hu: cl,
                it: Ul,
                pl: _d,
                ro: Qd,
                sl: mp,
                sk: Du
            },
            i = y().replace("-", ""),
            a = new Date(Date.now() - (Math.floor(Math.random() * 9e3) + 1e3));
        if (!e[i]) throw new Error(`Locale "${i}" is not supported`);
        return Rn(a, new Date, {
            addSuffix: !0,
            locale: e[i],
            unit: "second"
        })
    }
    _getRandomItemFromArray(e) {
        const o = Math.floor(Math.random() * e.length);
        return e[o]
    }
    getRandomNumber() {
        return Math.floor(Math.random() * (350 - 150 + 1)) + 150
    }
};
it.styles = [j.styles, L `
      .toast {
        padding: 1rem;
        border-radius: 0.375rem;
        border: 1px solid #60a5fa;
        background-color: #eff6ff;
        margin: 0;
      }
      .toast__inner {
        display: flex;
      }
      .toast__icon {
        flex-shrink: 0;
      }
      .toast__icon > svg {
        width: 1.25rem;
        height: 1.25rem;
        display: block;
        color: #60a5fa;
      }
      .toast__text {
        margin-left: 0.75rem;
      }
      .toast__title {
        font-weight: 700;
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-top: 0.5rem;
      }
      .toast__desc {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      .toast__time {
        color: var(--adm-red-500);
      }
      .toast__time::before {
        content: '·';
        margin: 0 0.375rem;
      }
      .toast__br {
        display: none;
      }
      @media (min-width: 640px) {
        .toast__time::before {
          content: none;
        }
        .toast__br {
          display: block;
        }
      }
    `];
di([A({
    type: String
})], it.prototype, "type", void 0);
it = di([I("adm-toast-item"), q()], it);
var ui = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let at = class extends j {
    constructor() {
        super(...arguments), this.product = ""
    }
    render() {
        return c `
      ${this._config.language==="pl"?c`
            <div class="voucher">
              <img
                class="voucher__image voucher__image--ebook"
                .src="${H("img","ebook.png",y())}"
                alt="Packshot"
              />

              <p class="voucher__text">
                ${n(c`W tej cenie otrzymujesz pakiet, w skład którego wchodzą: ${this.product} oraz e-book <i>"${jt(y())}"</i>.`)}
              </p>
            </div>
          `:this._config.language==="cs"||this._config.language==="es"||this._config.language==="hr"||this._config.language==="hu"||this._config.language==="it"||this._config.language==="sk"?c`
              <div class="voucher voucher--pack">
                <div class="voucher__pack">
                  <img
                    class="voucher__image voucher__image--ebook"
                    .src="${H("img","ebook.png",y())}"
                    alt="Packshot"
                  />
                  <span class="voucher__plus">+</span>
                  <img
                    class="voucher__image voucher__image--voucher"
                    .src="${H("img","voucher.png")}"
                    alt="Packshot"
                  />
                </div>

                <p class="voucher__text">
                  ${n(c`W tej cenie otrzymujesz pakiet, w skład którego wchodzą: ${this.product}, e-book <i>"${jt(y())}"</i> i voucher o wartości ${x(this._product.price,y()).voucherPrice} na kolejne zakupy.`)}
                </p>
              </div>
            `:c`
              <div class="voucher">
                <img
                  class="voucher__image voucher__image--voucher"
                  .src="${H("img","voucher.png")}"
                  alt="Packshot"
                />

                <p class="voucher__text">
                  ${n(c`W kupowanym pakiecie otrzymujesz ${this.product} oraz voucher na kolejne zakupy o&nbsp;wartości ${x(this._product.price,y()).voucherPrice}`)}
                </p>
              </div>
            `}
    `
    }
};
at.styles = [j.styles, L `
      .voucher {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin: 0 auto 1.5rem;
        border-radius: 0.375rem;
        padding: 0.5rem 0.75rem;
        background-color: var(--adm-blue-50);
        border: 1px solid var(--adm-blue-700);
      }

      .voucher__pack {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-right: 1rem;
        flex-shrink: 0;
      }

      .voucher__image {
        flex-shrink: 0;
        margin-right: 1rem;
      }

      .voucher__image--voucher {
        width: 80px;
      }

      .voucher__image--ebook {
        width: 50px;
      }

      .voucher__pack .voucher__image {
        margin: 0;
      }

      .voucher__pack .voucher__image--voucher {
        width: 50px;
      }

      .voucher__pack .voucher__image--ebook {
        width: 30px;
      }

      .voucher__plus {
        margin: 0 0.25rem;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--adm-blue-700);
      }

      .voucher__text {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1.25rem;
        color: var(--adm-blue-700);
        text-align: left;
      }

      @media (min-width: 768px) {
        .voucher__image--voucher {
          width: 100px;
        }
        .voucher__pack .voucher__image--voucher {
          width: 100px;
        }

        .voucher__pack .voucher__image--ebook {
          width: 50px;
        }
        .voucher__text {
          font-size: 0.875rem;
        }
      }
    `];
ui([A()], at.prototype, "product", void 0);
at = ui([I("adm-voucher"), q()], at);
var Ve = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let fe = class extends j {
    constructor() {
        super(...arguments), this._hasBeenShown = !1
    }
    connectedCallback() {
        super.connectedCallback(), this._config.lock === !0 && (this._config.flow === "upsell" || this._config.flow === "react") && setTimeout(() => {
            this._addEventListeners()
        }, 3e4)
    }
    render() {
        return super.connectedCallback(), this._config.lock === !0 && (this._config.flow === "upsell" || this._config.flow === "react") ? c `
        <div id="exit" class="exit">
          <div class="exit__wrapper">
            <div class="exit__modal">
              <div class="exit__header">
                <h1>${n("Uwaga!")}</h1>
                <p>${n("Prezent dla Ciebie!")}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  @click="${this._hideModal}"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="exit__body">
                <p>
                  ${n("Przez najbliższe 3 minuty przysługuje Ci dostęp do SUPER PROMOCJI.")}
                </p>
                <p>
                  ${n(c`Kliknij zielony przycisk i <strong>SPRAWDŹ, JAK DUŻO OSZCZĘDZASZ:</strong>`)}
                </p>
                <button class="exit__yes" @click="${this._handleSubmit}">
                  ${n("Sprawdzam promocję!")}
                </button>
                <button class="exit__no" @click="${this._hideModal}">
                  ${n("Nie, dziękuję. Nie lubię prezentów.")}
                </button>
              </div>
            </div>
          </div>
          <div class="exit__overlay"></div>
        </div>
      ` : m
    }
    _addEventListeners() {
        if (window.matchMedia("(hover: hover)").matches) document.addEventListener("mouseleave", this._showModal.bind(this));
        else {
            let e = window.scrollY || document.documentElement.scrollTop;
            window.addEventListener("scroll", () => {
                let o = window.scrollY || document.documentElement.scrollTop;
                o < e && this._showModal(), e = o <= 0 ? 0 : o
            }, !1)
        }
    }
    _showModal() {
        const e = v();
        (e === null || !e.lock) && (this._exit.style.display = "block", W({
            lock: !0
        }))
    }
    _hideModal() {
        this._exit.style.display = "none"
    }
    _handleSubmit() {
        W({
            lock: !0
        }), ae("promo")
    }
};
fe.styles = [j.styles, L `
      .exit {
        position: relative;
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        width: 100vw;
        overflow-y: auto;
      }
      .exit__wrapper {
        display: flex;
        min-height: 100%;
        align-items: flex-end;
        justify-content: center;
        padding: 1rem;
      }
      .exit__modal {
        position: relative;
        overflow: hidden;
        border-radius: 0.5rem;
        background-color: #ffffff;
        box-shadow:
          0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);
        z-index: 9999;
      }
      .exit__header {
        background-color: #d6243a;
        text-align: center;
        padding: 1rem;
        position: relative;
      }
      .exit__header h1 {
        color: #ffffff;
        font-weight: 700;
        font-size: 2.5rem;
        line-height: 1.25;
        text-transform: uppercase;
        margin-bottom: 0;
      }
      .exit__header p {
        color: #ffffff;
        font-size: 1.25rem;
        text-transform: uppercase;
        margin-bottom: 0;
      }
      .exit__header svg {
        cursor: pointer;
        display: inline-block;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
        fill: var(--adm-red-900);
      }
      .exit__body {
        text-align: center;
        padding: 1rem;
      }
      .exit__body p {
        font-size: 1rem;
        max-width: 400px;
        margin: 0 auto 1rem;
      }
      .exit__body button {
        cursor: pointer;
        display: block;
        width: 100%;
        margin: 1rem auto;
        text-align: center;
        line-height: 1.25rem;
        -webkit-appearance: button;
        transition-property: color, background-color, border-color,
          text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      .exit__body .exit__yes {
        border-radius: 0.5rem;
        padding: 1.25rem 0.75rem;
        font-size: 1.125rem;
        text-transform: uppercase;
        font-weight: 700;
        color: #ffffff;
        border: 0;
        background-color: var(--adm-green-600);
        box-shadow: inset 0 4px 8px 0 rgb(0 0 0 / 0.15);
      }
      .exit__body .exit__yes:hover {
        background-color: var(--adm-green-700);
      }
      .exit__body .exit__yes:focus {
        outline: 2px solid var(--adm-green-600);
        outline-offset: 2px;
      }
      .exit__body .exit__no {
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: var(--adm-gray-500);
        border: 1px solid var(--adm-gray-300);
        background-color: var(--adm-gray-50);
      }
      .exit__body .exit__no:hover {
        background-color: var(--adm-gray-100);
      }
      .exit__body .exit__no:focus {
        outline: 2px solid var(--adm-gray-400);
        outline-offset: 2px;
      }
      .exit__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--adm-gray-900);
        opacity: 0.7;
      }
      @media (min-width: 640px) {
        .exit__wrapper {
          align-items: center;
          padding: 0;
        }
        .exit__header,
        .exit__body {
          padding: 1.5rem 4rem;
        }
        .exit__body button {
          width: auto;
        }
        .exit__body .exit__yes {
          padding: 1rem 2.5rem;
        }
      }
      @media (min-width: 768px) {
        .exit__header h1 {
          font-size: 4rem;
        }
        .exit__header p {
          font-size: 2rem;
        }
      }
    `];
Ve([U("#exit")], fe.prototype, "_exit", void 0);
Ve([U(".exit__yes")], fe.prototype, "_yes", void 0);
Ve([U(".exit__no")], fe.prototype, "_no", void 0);
Ve([E()], fe.prototype, "_hasBeenShown", void 0);
fe = Ve([I("adm-exit"), q()], fe);
var Fe = globalThis && globalThis.__decorate || function(t, e, o, i) {
    var a = arguments.length,
        r = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i,
        s;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") r = Reflect.decorate(t, e, o, i);
    else
        for (var l = t.length - 1; l >= 0; l--)(s = t[l]) && (r = (a < 3 ? s(r) : a > 3 ? s(e, o, r) : s(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r
};
let we = class extends j {
    constructor() {
        super(), this.order = {
            phone: "",
            firstname: "",
            lastname: "",
            address: "",
            zip: "",
            city: "",
            country: "",
            email: "",
            province_code: "",
            payment_return_url: "",
            typconf2: "true"
        }, this._view = "confirm", this._validationError = !1;
        const e = v();
        e && (this.order = { ...this.order,
            ...e == null ? void 0 : e.order_data
        })
    }
    render() {
        const e = {
                duration: 500,
                easing: "ease-in-out"
            },
            o = c `
      <div id="alert" class="typconf__alert">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
          <p>
            ${n('Niepoprawne dane - kliknij "Poprawiam", aby je zmienić.')}
          </p>
        </div>
      </div>
    `,
            i = c ` <section
      ${De({...e,in:Ee,out:Ce,stabilizeOut:!0,skipInitial:!0})}
    >
      <div>
        <h2>
          ${n("Przeczytaj dokładnie informacje na temat Twojego zamówienia.")}
        </h2>
        <p>
          ${n("Twoje zamówienie zostało zarejestrowane. Niebawem zostanie zabezpieczone, spakowane i wysłane do Ciebie.")}
        </p>
        <p>
          ${n(c`<span>UWAGA!</span> W ciągu najbliższych 3 minut możesz <strong>bez żadnych dodatkowych</strong> opłat nadać paczce <strong>pierwszeństwo wysyłki</strong>. Dzięki temu zostanie nadana w pierwszej kolejności i otrzymasz ją szybciej.`)}
        </p>
        <div class="typconf__box">
          <h3>${n("Jak to zrobić?")}</h3>
          <ol>
            <li>
              ${n(c`<strong>Sprawdź, czy Twoje dane są poprawne.</strong> Zwróć uwagę na literówki w Twoim nazwisku, nazwie ulicy i miasta oraz na poprawność kodu pocztowego.`)}
            </li>
            <li>
              ${n(c`<strong>Jeśli zauważysz pomyłkę, kliknij „POPRAWIAM”.</strong> Następnie nanieś poprawki i potwierdź zmiany, a Twoja paczka zyska pierwszeństwo wysyłki.`)}
            </li>
            <li>
              ${n(c`<strong>Jeśli dane są poprawne i bezbłędne – kliknij „POTWIERDZAM DANE”</strong> i gotowe! Twoje zamówienie ma pierwszeństwo wysiłki.`)}
            </li>
          </ol>
        </div>
        <p>
          ${n(c`Potwierdzenie danych <strong>zajmie Ci tylko 30 sekund</strong>, a dzięki temu nie musisz niepotrzebnie czekać na paczkę dłużej, tylko otrzymasz ją ekspresowo!`)}
        </p>
        ${this._validationError?o:m}
        <div class="typconf__box">
          <h3>${n("Twoje dane")}:</h3>
          <div class="typconf__data">
            <p>
              ${this.order.firstname} ${this.order.lastname}<br />
              ${this.order.email}<br />
              ${this.order.phone}
            </p>
            <p>
              ${this.order.address}<br />
              ${this.order.zip} ${this.order.city}<br />
              ${this.order.country}
            </p>
          </div>
          <footer>
            <button
              class="typconf__edit"
              @click=${()=>this.changeView("edit")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>${n("Poprawiam")}</span>
            </button>
            <button class="typconf__confirm" @click=${this._handleSubmit}>
              <span>${n("Potwierdzam dane")}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 12H20.33"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </footer>
        </div>
      </div>
    </section>`,
            a = c `
      <section
        id="edit"
        ${De({...e,in:Ee,out:Ce,stabilizeOut:!0,skipInitial:!0})}
      >
        <p>
          ${n("Nanieś poprawki i potwierdź zmiany, a Twoja paczka zostanie nadana w pierwszej kolejności i otrzymasz ją szybciej.")}
        </p>
        <div class="typconf__form">
          <adm-form edit .typ=${this.order.payment_return_url}></adm-form>
        </div>
      </section>
    `;
        return c `
      <adm-page .color=${this._view==="edit"?"neutral":"success"}>
        ${this._view==="edit"?c` ${n("Twoje dane")} `:c` ${n("Dziękujemy, to już ostatni krok!")} `}
        <div slot="body">
          ${this._view==="confirm"?i:m}
          ${this._view==="edit"?a:m}
        </div>
      </adm-page>
    `
    }
    changeView(e) {
        this._view = e
    }
    _handleSubmit(e) {
        e.preventDefault(), this._submit.disabled = !0, this._confirmOrder(this.order)
    }
    _confirmOrder(e) {
        var o;
        G.url(`orders/${(o=v())===null||o===void 0?void 0:o.order_id}`).put({
            order: e
        }).json().then(i => {
            var a;
            const r = (a = v()) === null || a === void 0 ? void 0 : a.payment_link;
            return r && r !== "" ? (window.location.assign(r), i) : (window.location.assign(this._getThankYouPage()), i)
        }).catch(() => {
            this._validationError = !0, this._submit.disabled = !1
        })
    }
    _getThankYouPage() {
        if (this._config.typ !== "") {
            const e = new URL(this._config.typ),
                o = _e();
            return o ? (e.search === "" ? e.search = "?" + o : e.search += "&" + o, e.toString()) : this._config.typ
        }
        return Ie("thank-you")
    }
};
we.styles = [j.styles, L `
      .typconf {
        max-width: 48rem;
        background-color: #ffffff;
        border-radius: 0.5rem;
        border-top: 4px solid #2bad57;
        box-shadow:
          0 10px 15px -3px rgb(0 0 0 / 0.1),
          0 4px 6px -4px rgb(0 0 0 / 0.1);
        padding: 2rem 1rem;
      }
      .typconf--edit {
        border-color: #4681f4;
      }
      header {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #d6e2eb;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      header svg {
        stroke: #2bad57;
        width: 2rem;
        height: 2rem;
        display: inline-block;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      h1 {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
      }
      h2 {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      #edit h2 {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
        margin-bottom: 0.5rem;
      }
      h3 {
        font-size: 0.875rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      p {
        font-size: 1rem;
        margin-bottom: 1rem;
      }
      p span {
        color: var(--adm-red-700);
        font-weight: 700;
      }
      strong {
        font-weight: 700;
      }
      ol {
        padding-left: 1rem;
      }
      ul {
        list-style: none;
      }
      li {
        margin-bottom: 1rem;
      }
      li:last-child {
        margin-bottom: 0;
      }
      ul > li {
        margin-bottom: 0.25rem;
      }
      ::marker {
        font-weight: 700;
      }
      .typconf__box {
        border: 1px solid #d7e1ea;
        border-radius: 0.5rem;
        background-color: #f8fafc;
        padding: 1rem;
        margin: 1rem 0;
      }
      footer {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        row-gap: 0.5rem;
        margin-top: 1rem;
      }
      footer > button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        font-size: 0.875rem;
        font-weight: 700;
        padding: 0.5rem 1rem;
        border-width: 1px;
        border-style: solid;
        border-radius: 0.25rem;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        cursor: pointer;
      }
      footer > button > svg {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .typconf__edit {
        background-color: #ffffff;
        border-color: #4681f4;
        color: #4681f4;
      }
      .typconf__edit:hover {
        background-color: #ebf2f8;
      }
      .typconf__edit > svg {
        stroke: #4681f4;
        margin-right: 0.5rem;
      }
      .typconf__confirm {
        background-color: #4681f4;
        border-color: #4681f4;
        color: #ffffff;
      }
      .typconf__confirm:hover {
        background-color: #3161bf;
        border-color: #3161bf;
        color: #ffffff;
      }
      .typconf__confirm > svg {
        stroke: #ffffff;
        margin-left: 0.5rem;
      }
      .typconf__alert {
        padding: 1rem;
        background-color: var(--adm-red-50);
        border-radius: 0.375rem;
        margin-bottom: 1rem;
        margin-top: 2rem;
      }
      .typconf__alert > div {
        display: flex;
      }
      .typconf__alert svg {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
        color: var(--adm-red-400);
      }
      .typconf__alert p {
        margin-left: 0.75rem;
        margin-bottom: 0;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: var(--adm-red-800);
      }
      .typconf__alert ~ .typconf__box {
        margin-top: 0;
      }

      @media (min-width: 768px) {
        .typconf {
          padding: 3rem 4rem;
        }
        header {
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
        }
        header svg {
          width: 2.5rem;
          height: 2.5rem;
        }
        h1 {
          font-size: 2rem;
        }
        h2 {
          font-size: 1.25rem;
        }
        #edit h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        h3 {
          margin-bottom: 1rem;
        }
        .typconf__box {
          padding: 1.5rem;
          margin: 2rem 0;
        }
        footer {
          grid-template-columns: repeat(12, minmax(0, 1fr));
          column-gap: 1rem;
          row-gap: 0;
        }
        footer > button {
          font-size: 1rem;
          padding: 0.75rem 1.5rem;
        }
        .typconf__edit {
          grid-column: span 4 / span 4;
        }
        .typconf__confirm {
          grid-column: span 8 / span 8;
        }
        .typconf__form {
          margin-top: 2rem;
        }
      }
    `];
Fe([A({
    type: Object,
    attribute: !1
})], we.prototype, "order", void 0);
Fe([E()], we.prototype, "_view", void 0);
Fe([E()], we.prototype, "_validationError", void 0);
Fe([U(".typconf__confirm")], we.prototype, "_submit", void 0);
we = Fe([I("adm-typconf"), q()], we);
export {
    c as x
};