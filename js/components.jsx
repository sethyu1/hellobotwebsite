/* HelloBot shared UI components — exported to window */
const { useState, useEffect, useMemo, useRef, createContext, useContext } = React;

// ============ I18n ============
const I18nCtx = createContext({ lang: "zh", t: (k) => k, setLang: () => {} });
const useI18n = () => useContext(I18nCtx);

function I18nProvider({ children, initialLang = "zh" }) {
  const [lang, setLang] = useState(initialLang);
  const dict = window.HB_CONTENT[lang];
  const t = (path) => {
    return path.split(".").reduce((o, k) => (o ? o[k] : undefined), dict);
  };
  return (
    <I18nCtx.Provider value={{ lang, setLang, t, dict }}>
      <div className={lang === "zh" ? "lang-zh" : "lang-en"} style={{ minHeight: "100%" }}>
        {children}
      </div>
    </I18nCtx.Provider>
  );
}

// ============ Router (page state) ============
const RouterCtx = createContext({ page: "home", go: () => {}, mobile: false });
const useRouter = () => useContext(RouterCtx);

// ============ Avatar ============
function Avatar({ emoji, color, size = "md", id }) {
  const cls = size === "sm" ? "av av-sm" : size === "lg" ? "av av-lg" : "av";
  return (
    <div className={cls} style={{ background: color, color: "#0B1020", boxShadow: "inset 0 0 0 2px rgba(0,0,0,.18)" }}>
      <span style={{ filter: "saturate(1.1)" }}>{emoji}</span>
      {size === "lg" && id && (
        <span style={{
          position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
          background: "#1A1812", color: "#F5EFE3", fontFamily: "var(--font-mono)",
          fontSize: 9, padding: "2px 6px", borderRadius: 3, letterSpacing: ".1em", whiteSpace: "nowrap"
        }}>{id}</span>
      )}
    </div>
  );
}

// ============ Energy Bar ============
function EnergyBar({ value, label, paper }) {
  const cls = value > 60 ? "green" : value > 30 ? "yellow" : "red";
  const stateZh = value > 60 ? "正常" : value > 30 ? "略累" : "想下班";
  const stateEn = value > 60 ? "Steady" : value > 30 ? "Tiring" : "Clocking out";
  const { lang } = useI18n();
  const labelStyle = lang === "zh"
    ? {
        display: "flex", justifyContent: "space-between",
        fontSize: 12.5, letterSpacing: ".02em", fontWeight: 500,
        color: paper ? "var(--ink-paper)" : "var(--ink-1)",
        marginBottom: 6,
      }
    : {
        display: "flex", justifyContent: "space-between",
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em",
        color: paper ? "var(--ink-paper-2)" : "var(--ink-3)",
        marginBottom: 4, textTransform: "uppercase",
      };
  return (
    <div>
      <div style={labelStyle}>
        <span>{label || (lang === "zh" ? "精力" : "Energy")}</span>
        <span>{value}% · {lang === "zh" ? stateZh : stateEn}</span>
      </div>
      <div className={`energy ${cls}`} style={paper ? { background: "rgba(40,30,10,.12)" } : null}>
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ============ Stamp ============
function Stamp({ children, color = "orange", rotate = false, style }) {
  return <span className={`stamp stamp-${color} ${rotate ? "stamp-rotate" : ""}`} style={style}>{children}</span>;
}

// ============ Candidate Card (ID Card style) ============
function CandidateCard({ c, onClick, compact }) {
  const { lang } = useI18n();
  const role = lang === "zh" ? c.roleZh : c.roleEn;
  const name = lang === "zh" ? c.nameZh : c.nameEn;
  const salary = lang === "zh" ? c.salaryZh : c.salaryEn;
  const pers = lang === "zh" ? c.persZh : c.persEn;
  const skills = lang === "zh" ? c.skillsZh : c.skillsEn;
  const blurb = lang === "zh" ? c.blurbZh : c.blurbEn;
  const moodTxt = lang === "zh" ? c.moodZh : c.moodEn;

  return (
    <button onClick={onClick} className="lift" style={{
      all: "unset", cursor: "pointer", display: "block", width: "100%",
      background: "var(--bg-paper)", color: "var(--ink-paper)", borderRadius: 10,
      boxShadow: "var(--shadow-paper)", overflow: "hidden", position: "relative",
    }}>
      {/* Header strip — looks like an HR file tab */}
      <div style={{
        background: "var(--ink-paper)", color: "var(--bg-paper)",
        padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase"
      }}>
        <span>{c.id}</span>
        <span style={{ display: "flex", gap: 6 }}>
          <i style={{ width: 6, height: 6, borderRadius: 99, background: "var(--brand)" }} />
          <span>{lang === "zh" ? "候选人档案" : "Candidate File"}</span>
        </span>
      </div>

      <div style={{ padding: "20px 18px 16px", position: "relative" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <Avatar emoji={c.emoji} color={c.color} size="md" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
              <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-.01em" }}>{name}</div>
              <Stamp color="paper" style={{ fontSize: 9.5 }}>{lang === "zh" ? c.tierZh : c.tierEn}</Stamp>
            </div>
            <div style={lang === "zh"
              ? { color: "var(--ink-paper)", fontSize: 13, marginTop: 3, fontWeight: 500 }
              : { color: "var(--ink-paper-2)", fontSize: 12.5, marginTop: 2 }
            }>{role}</div>
          </div>
        </div>

        {!compact && (
          <div style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-paper)" }}>
            "{blurb}"
          </div>
        )}

        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {skills.slice(0, 3).map((s, i) => <span key={i} className="chip chip-paper">{s}</span>)}
        </div>

        <div style={{ marginTop: 14 }}>
          <EnergyBar value={c.energy} paper />
        </div>

        <div style={{
          marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 14, borderTop: "1px dashed var(--line-paper)"
        }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--ink-paper-2)", letterSpacing: ".15em", textTransform: "uppercase" }}>
              {lang === "zh" ? "期望薪资" : "Salary"}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{salary}</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 18 }}>{c.mood}</span>
            <span style={{ fontSize: 11.5, color: "var(--ink-paper-2)", maxWidth: 110, textAlign: "right", lineHeight: 1.25 }}>{moodTxt}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ============ NAV ============
function Nav({ onLogoClick }) {
  const { lang, setLang, t } = useI18n();
  const { page, go, mobile } = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const items = [
    { k: "home", label: t("nav.home") },
    { k: "product", label: t("nav.product") },
    { k: "employees", label: t("nav.employees") },
    { k: "cases", label: t("nav.cases") },
    { k: "pricing", label: t("nav.pricing") },
    { k: "faq", label: t("nav.faq") },
    { k: "about", label: t("nav.about") },
  ];

  // Lock scroll when drawer open
  React.useEffect(() => {
    if (mobile && drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobile, drawerOpen]);

  const navTo = (k) => { go(k); setDrawerOpen(false); };

  return (
    <>
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(11,16,32,.78)", backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--line-soft)",
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: mobile ? 56 : 68, gap: 16,
      }}>
        <button onClick={() => go("home")} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          {!mobile && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".18em" }}>HR · v1.0</span>}
        </button>

        {!mobile && (
          <nav style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {items.map(it => (
              <button key={it.k} onClick={() => go(it.k)} className={`nav-link ${page === it.k ? "active" : ""}`} style={{ background: "transparent", border: 0 }}>
                {it.label}
              </button>
            ))}
          </nav>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!mobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 0, padding: 3, border: "1px solid var(--line)", borderRadius: 999 }}>
              <button onClick={() => setLang("zh")} className="t-mono" style={{
                all: "unset", cursor: "pointer", padding: "5px 10px", borderRadius: 999, fontSize: 12,
                background: lang === "zh" ? "var(--brand)" : "transparent",
                color: lang === "zh" ? "var(--brand-ink)" : "var(--ink-2)", fontWeight: 600,
              }}>中文</button>
              <button onClick={() => setLang("en")} className="t-mono" style={{
                all: "unset", cursor: "pointer", padding: "5px 10px", borderRadius: 999, fontSize: 12,
                background: lang === "en" ? "var(--brand)" : "transparent",
                color: lang === "en" ? "var(--brand-ink)" : "var(--ink-2)", fontWeight: 600,
              }}>EN</button>
            </div>
          )}
          {/* Sticky CTA — primary action, always visible */}
          <button onClick={() => go("employees")} className="btn btn-primary btn-sm">{t("nav.cta")} →</button>
          {/* Mobile-only: compact lang toggle (tap to flip to the other language) */}
          {mobile && (
            <button
              onClick={() => setLang(lang === "zh" ? "en" : "zh")}
              aria-label="Toggle language"
              className="t-mono"
              style={{
                all: "unset", cursor: "pointer", display: "grid", placeItems: "center",
                width: 40, height: 40, borderRadius: 8, border: "1px solid var(--line)",
                fontSize: 11, fontWeight: 600, color: "var(--ink-2)", letterSpacing: ".06em",
              }}>{lang === "zh" ? "EN" : "中"}</button>
          )}
          {/* Hamburger — mobile only */}
          {mobile && (
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Menu"
              style={{
                all: "unset", cursor: "pointer", display: "grid", placeItems: "center",
                width: 40, height: 40, borderRadius: 8, border: "1px solid var(--line)",
              }}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>

      {/* Mobile drawer — sibling of header so it scopes to App root */}
      {mobile && drawerOpen && (
        <>
          <div onClick={() => setDrawerOpen(false)} style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,.62)", zIndex: 60,
            animation: "hb-fade-in .15s ease",
          }} />
          <aside style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "min(86%, 320px)",
            background: "#0B1020", zIndex: 61,
            borderLeft: "1px solid var(--line)",
            boxShadow: "-24px 0 60px -10px rgba(0,0,0,.55)",
            display: "flex", flexDirection: "column",
            animation: "hb-slide-in .22s ease",
          }}>
            {/* Drawer header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 18px", borderBottom: "1px solid var(--line-soft)", height: 56,
            }}>
              <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".2em" }}>MENU</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close" style={{
                all: "unset", cursor: "pointer", width: 36, height: 36, borderRadius: 8,
                display: "grid", placeItems: "center", border: "1px solid var(--line)",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ flex: "1 1 auto", minHeight: 380, padding: "8px 0", overflowY: "auto" }}>
              {items.map(it => (
                <button key={it.k} onClick={() => navTo(it.k)} style={{
                  all: "unset", cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 22px", width: "100%", boxSizing: "border-box",
                  fontSize: 17, fontWeight: 600,
                  color: page === it.k ? "var(--brand)" : "var(--ink-0)",
                  borderBottom: "1px solid var(--line-soft)",
                  background: page === it.k ? "rgba(255,138,61,.06)" : "transparent",
                }}>
                  <span>{it.label}</span>
                  <span style={{ color: page === it.k ? "var(--brand)" : "var(--ink-3)", fontFamily: "var(--font-mono)" }}>→</span>
                </button>
              ))}
            </nav>

            {/* Drawer footer: lang + cta */}
            <div style={{ flexShrink: 0, padding: 18, borderTop: "1px solid var(--line-soft)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 0, padding: 3, border: "1px solid var(--line)", borderRadius: 999, alignSelf: "flex-start" }}>
                <button onClick={() => setLang("zh")} className="t-mono" style={{
                  all: "unset", cursor: "pointer", padding: "6px 14px", borderRadius: 999, fontSize: 12,
                  background: lang === "zh" ? "var(--brand)" : "transparent",
                  color: lang === "zh" ? "var(--brand-ink)" : "var(--ink-2)", fontWeight: 600,
                }}>中文</button>
                <button onClick={() => setLang("en")} className="t-mono" style={{
                  all: "unset", cursor: "pointer", padding: "6px 14px", borderRadius: 999, fontSize: 12,
                  background: lang === "en" ? "var(--brand)" : "transparent",
                  color: lang === "en" ? "var(--brand-ink)" : "var(--ink-2)", fontWeight: 600,
                }}>EN</button>
              </div>
              <button onClick={() => navTo("employees")} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {t("nav.cta")} →
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, background: "var(--brand)",
        display: "grid", placeItems: "center", color: "var(--brand-ink)", fontWeight: 800,
        fontFamily: "var(--font-mono)", fontSize: 14, position: "relative",
      }}>
        H
        <span style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: "var(--ok)", borderRadius: 99, border: "2px solid var(--bg-1)" }} />
      </div>
      <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.01em" }}>HelloBot</span>
    </div>
  );
}

// ============ FOOTER ============
function Footer() {
  const { t, lang } = useI18n();
  const { go, mobile } = useRouter();
  return (
    <footer style={{ background: "var(--bg-0)", borderTop: "1px solid var(--line-soft)", padding: "56px 0 32px", marginTop: 64 }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.4fr 1fr 1fr 1fr", gap: 32 }}>
        <div>
          <Logo />
          <p style={{ color: "var(--ink-2)", marginTop: 14, maxWidth: 320, fontSize: 14, lineHeight: 1.6 }}>{t("footer.tagline")}</p>
          <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
            <Stamp color="green">● Online</Stamp>
            <Stamp color="orange">v1.0 BETA</Stamp>
          </div>
        </div>
        <FooterCol title={t("footer.product")} items={t("footer.productItems")} go={go} />
        <FooterCol title={t("footer.company")} items={t("footer.companyItems")} go={go} />
        <FooterCol title={t("footer.legal")} items={t("footer.legalItems")} go={go} />
      </div>
      <div className="container" style={{ marginTop: 48, paddingTop: 24, borderTop: "1px dashed var(--line-soft)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 14px" }}>
          <span style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{t("footer.copy")}</span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--font-mono)", textDecoration: "none", borderBottom: "1px dotted var(--line)" }}
            onMouseOver={e => e.currentTarget.style.color = "var(--ink-1)"}
            onMouseOut={e => e.currentTarget.style.color = "var(--ink-3)"}
          >
            {t("footer.icp")}
          </a>
        </div>
        <span style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          {lang === "zh" ? "本站含有微量职场幽默，请理性食用。" : "Contains trace amounts of workplace humor. Consume responsibly."}
        </span>
      </div>
    </footer>
  );
}
// Footer items are objects: { label, page?, scrollTo?, href? }.
// - href: render as <a> external/static link.
// - page: render as in-app navigation; if scrollTo is set, scroll to that
//   element id after the page mounts (rAF×2 → after layout, no magic timeout).
// - otherwise: render as inert label.
function FooterCol({ title, items, go }) {
  const itemStyle = { color: "var(--ink-1)", fontSize: 14, cursor: "pointer", display: "block" };
  const onOver = e => e.currentTarget.style.color = "var(--brand)";
  const onOut = e => e.currentTarget.style.color = "var(--ink-1)";

  const navigate = (it) => {
    go(it.page);
    if (!it.scrollTo) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = document.getElementById(it.scrollTo);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  };

  const renderItem = (it) => {
    if (it.href) {
      return <a href={it.href} style={itemStyle} onMouseOver={onOver} onMouseOut={onOut}>{it.label}</a>;
    }
    if (it.page) {
      return <span onClick={() => navigate(it)} style={itemStyle} onMouseOver={onOver} onMouseOut={onOut}>{it.label}</span>;
    }
    return <span style={itemStyle}>{it.label}</span>;
  };

  return (
    <div>
      <div className="t-eyebrow" style={{ marginBottom: 12 }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((it, i) => <li key={i}>{renderItem(it)}</li>)}
      </ul>
    </div>
  );
}

// Export to window
Object.assign(window, {
  I18nCtx, I18nProvider, useI18n,
  RouterCtx, useRouter,
  Avatar, EnergyBar, Stamp, CandidateCard,
  Nav, Logo, Footer,
});
