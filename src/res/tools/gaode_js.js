/**
 * Created by 李明泽 on 2016/10/19.
 */
(function (config) {
    var ca = navigator.userAgent.toLowerCase(), da = window, ga = document, ma = ga.documentElement;

    function e(a) {
        return -1 !== ca.indexOf(a)
    }

    var na = "ActiveXObject" in da, ta = "devicePixelRatio" in da && 1 < da.devicePixelRatio || na && "matchMedia" in da && da.matchMedia("(min-resolution:144dpi)") && da.matchMedia("(min-resolution:144dpi)").matches, ua = e("windows nt"), Aa = -1 !== ca.search(/windows nt [1-5]\./), Ba = -1 !== ca.search(/windows nt 5\.[12]/), Ca = Aa && !Ba, Ma = e("windows phone"), Na = e("macintosh"), Oa = e("ipad;"), Xa = Oa && ta, Ya = e("ipod touch;"), gb = e("iphone;"), hb = gb || Oa || Ya, ib = hb && -1 !== ca.search(/ os [456]_/);
    hb && ca.search(/ os [4-8]_/);
    var jb = hb && -1 !== ca.search(/ os [78]_/);
    hb && e("os 8_");
    var kb = hb && e("os 10_"), yb = e("android"), Nb = -1 !== ca.search(/android [123]/), Ob = e("android 4");
    yb && -1 === ca.search(/android [1-4]/) || ca.search(/android 4.4/);
    var Pb = yb ? "android" : hb ? "ios" : ua ? "windows" : Na ? "mac" : "other", Qb = na && !da.XMLHttpRequest, Rb = na && !ga.querySelector, Sb = na && !ga.addEventListener, Tb = na && e("ie 9"), Ub = na && e("msie 10"), Vb = na && e("rv:11"), Wb = e("edge"), Xb = e("qtweb"), nc = e("ucbrowser"), oc = e("micromessenger"), pc = e("mqqbrowser"), qc = e("baidubrowser"), chrome = (e("chrome") || e("crios")) && !oc && !qc && !pc && !Wb, rc = e("firefox"), sc = (Na || hb) && e("safari") && e("version/"), tc = hb && e("aliapp"), uc = hb && !pc && !nc && !oc && !chrome && !rc && !sc || tc, vc = yb || hb || Ma || e("mobile") ||
            "undefined" !== typeof orientation, wc = da.navigator && da.navigator.msPointerEnabled && !!da.navigator.msMaxTouchPoints, xc = wc || e("touch") || "ontouchstart" in ga, yc = na && "transition" in ma.style, zc = !!ga.createElementNS && !!ga.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, Ac = ga.createElement("canvas"), Bc = !(!Ac || !Ac.getContext), Jc = window.URL || window.webkitURL, Kc = !na && !(nc && yb) && window.Worker && Jc && Jc.createObjectURL && window.Blob, Lc = !vc && chrome && Kc && Bc && !uc && !(!Ac.getContext("webgl") && !Ac.getContext("experimental-webgl")),
        Mc = !Bc || Xb || Ma || vc && rc || Tb || ib || Xa || Ya || Nb || e("gt-n710") || Ca, Nc = !Mc && !Lc && (Ob || jb || hb && oc || !vc), Oc = Lc ? "vw" : Mc ? "d" : Nc ? "dv" : "v", Pc = e("webkit"), Qc = "WebKitCSSMatrix" in da && "m11" in new window.WebKitCSSMatrix, Rc = "MozPerspective" in ma.style, Sc = "OTransition" in ma.style, Tc = yc || Qc || Rc || Sc, Uc = void 0 !== config[8] ? config[8] : !0, Vc = void 0 !== config[9] ? config[9] : !0, Wc = !zc && vc && Bc, Xc = !1;
    try {
        Xc = "undefined" !== typeof da.localStorage
    } catch (Yc) {
    }
    config.j = {
        size: gb ? 100 : yb ? 200 : 500,
        zy: Na,
        W2: ua,
        kH: hb,
        PV: kb,
        ze: yb,
        b0: Nb,
        bz: Pb,
        Nw: qc,
        Y1: pc,
        gY: sc,
        OZ: oc,
        im: na,
        Mf: Qb,
        Mo: Rb,
        q1: Tb,
        BV: Ub,
        ed: Sb,
        DV: na && !Vb,
        qs: Xc,
        ut: nc,
        chrome: chrome,
        sG: rc,
        W: vc,
        O1: vc && Pc,
        rW: vc && Qc,
        N1: vc && da.opera,
        ba: ta,
        Cc: xc,
        ZH: wc,
        MZ: Pc,
        p1: yc,
        NZ: Qc,
        L0: Rc,
        R1: Sc,
        BS: Tc,
        Th: zc,
        Po: Bc,
        zH: Kc,
        So: Lc,
        b_: !1,
        Gf: Uc && !Mc,
        NS: Uc ? Oc : "d",
        km: Vc && !!da.WebSocket && !qc,
        SW: Wc,
        WW: Bc || Wc ? "c" : "d"
    };
    var da = window, Zc = "http map anip layers overlay0 brender mrender".split(" ");
    config.hd = "main";
    config.j.Cc && (Zc += ",touch", config.hd += "t");
    config.j.W || (Zc += ",mouse", config.hd += "m");
    config.hd += "c";
    config.j.Gf && (config.hd += "v", Zc += ",vectorlayer,overlay", config.j.So ? (config.hd += "w", Zc += ",wgl") : (config.hd += "cg", Zc += ",cgl"));
    config[7] && (Zc += "," + config[7], config.hd += config[7].replace(",", "").replace(eval("/AMap./gi"), ""));
    Zc += ",sync";
    config.cK = Zc.split(",");
    window.AMap = window.AMap || {};
    window.AMap.ih = "1.3.20.2";
    var $c = window.AMap.Yz = {}, ad = config[2].split(",")[0], bd = ad + "/theme/v" + config[4] + "/style1.3.20.2.css", cd = document.head || document.getElementsByTagName("head")[0];
    if (cd) {
        var dd = document.createElement("link");
        dd.setAttribute("rel", "stylesheet");
        dd.setAttribute("type", "text/css");
        dd.setAttribute("href", bd);
        cd.insertBefore(dd, cd.firstChild)
    } else document.write("<link rel='stylesheet' href='" + bd + "'/>");
    function ed(a) {
        var b = document, c = b.createElement("script");
        c.charset = "utf-8";
        c.src = a;
        (a = b.body || cd) && a.appendChild(c)
    }

    function fd() {
        for (var a = ad + "/maps/main?v=" + config[4] + "&key=" + config[0] + "&m=" + config.cK.join(",") + "&vrs=1.3.20.2", b = document.getElementsByTagName("script"), c, d = 0; d < b.length; d += 1)if (0 === b[d].src.indexOf(ad.split(":")[1] + "/maps?")) {
            c = b[d];
            break
        }
        config[5] || c && c.async ? ed(a) : (document.write('<script id="amap_main_js" src=\'' + a + "' type='text/javascript'>\x3c/script>"), setTimeout(function () {
            document.getElementById("amap_main_js") || ed(a)
        }, 1))
    }

    var gd = (new Date).getTime();
    $c.__load__ = function (a) {
        a(config, gd);
        $c.__load__ = null
    };
    try {
        if (window.localStorage) {
            var hd = window.localStorage["_AMap_" + config.hd], id = !1;
            hd ? (hd = JSON.parse(hd), hd.version === window.AMap.ih ? (eval(hd.script), $c.loaded = !0) : id = !0) : id = !0;
            if (id)for (var F in window.localStorage)window.localStorage.hasOwnProperty(F) && 0 === F.indexOf("_AMap_") && window.localStorage.removeItem(F)
        }
    } catch (jd) {
    }
    $c.loaded || (fd(), config.cK = void 0);
})(["014acde7645c490c111163c1d4091418", [115.423411, 39.442758, 117.514625, 41.060816, 116.405285, 39.904989], "http://webapi.amap.com", 1, "1.3", null, "110000", "", true, true])