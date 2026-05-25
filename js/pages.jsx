/* Other pages: Employees, Product, How, Cases, Pricing, FAQ, About */
const { useState: useStateP, useEffect: useEffectP } = React;

// =================== EMPLOYEES (Talent Marketplace) ===================
function EmployeesPage() {
  const { t, lang } = useI18n();
  const { go, mobile } = useRouter();
  const [filter, setFilter] = useStateP("all");
  const candidates = window.HB_CANDIDATES;

  const persOptions = [
    { k: "all", zh: "全部", en: "All" },
    { k: "摸鱼型", zh: "摸鱼型", en: "Loafer" },
    { k: "卷王型", zh: "卷王型", en: "Overachiever" },
    { k: "社恐型", zh: "社恐型", en: "Quiet" },
    { k: "嘴碎型", zh: "嘴碎型", en: "Chatty" },
    { k: "完美主义", zh: "完美主义", en: "Perfectionist" },
  ];

  const filtered = filter === "all" ? candidates : candidates.filter(c => c.persEn === filter || c.persZh === filter);

  return (
    <main>
      {/* HEADER */}
      <section style={{ padding: mobile ? "32px 0 24px" : "56px 0 32px", borderBottom: "1px dashed var(--line)" }}>
        <div className="container">
          <Stamp color="orange">{t("employees.eyebrow")}</Stamp>
          <h1 className="h-display" style={{ marginTop: 18 }}>
            <div>{t("employees.title1")}</div>
            <div><span style={{ color: "var(--brand)" }}>{t("employees.title2")}</span></div>
          </h1>
          <p style={{ color: "var(--ink-1)", maxWidth: 640, fontSize: mobile ? 16 : 18, lineHeight: 1.6, marginTop: 18 }}>{t("employees.sub")}</p>
        </div>
      </section>

      {/* TIERS LADDER */}
      <section className="section-sm">
        <div className="container">
          <SectionHeader eyebrow={lang === "zh" ? "学历体系" : "Education Tiers"} title={t("employees.tiersTitle")} num="A" />
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(7, 1fr)", gap: 10 }}>
            {t("employees.tiers").map((tier, i) => (
              <div key={i} className="card-dark lift" style={{ padding: 16, position: "relative", overflow: "hidden" }}>
                <div style={{ height: 4, width: `${15 + i * 12}%`, background: i === 6 ? "var(--brand)" : "rgba(255,138,61,.4)", borderRadius: 4 }} />
                <div className="t-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".15em", marginTop: 14 }}>TIER 0{i+1}</div>
                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 4 }}>{tier.n}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>{tier.e}</div>
                <p style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.5 }}>{tier.desc}</p>
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px dashed var(--line)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--brand)" }}>{tier.salary}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONALITIES */}
      <section className="section-sm" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader eyebrow={lang === "zh" ? "性格模板" : "Personalities"} title={t("employees.personalityTitle")} num="B" />
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)", gap: 12 }}>
            {t("employees.personalities").map((p, i) => (
              <div key={i} className="card-dark lift" style={{ padding: 18, textAlign: "center" }}>
                <div style={{ fontSize: 36 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, marginTop: 8 }}>{p.t}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", marginTop: 4 }}>{p.e}</div>
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px dashed var(--line)", fontSize: 11.5, color: "var(--ink-2)" }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE GRID */}
      <section className="section-sm">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <Stamp>{lang === "zh" ? "在岗候选人" : "AVAILABLE CANDIDATES"}</Stamp>
              <h2 className="h-section" style={{ marginTop: 14 }}>{lang === "zh" ? "今天有 8 位候选人在线" : "8 candidates online today"}</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {persOptions.map(o => (
                <button key={o.k} onClick={() => setFilter(o.k)} className="chip" style={{
                  background: filter === o.k ? "var(--brand)" : "rgba(255,255,255,.04)",
                  color: filter === o.k ? "var(--brand-ink)" : "var(--ink-1)",
                  borderColor: filter === o.k ? "var(--brand)" : "var(--line)",
                  cursor: "pointer", fontWeight: 600,
                }}>{lang === "zh" ? o.zh : o.en}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(c => <CandidateCard key={c.id} c={c} onClick={() => {}} />)}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section-sm" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader eyebrow={lang === "zh" ? "能力方向" : "Capabilities"} title={t("employees.capTitle")} num="C" />
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {t("employees.caps").map((c, i) => (
              <div key={i} className="chip" style={{ padding: "10px 16px", fontSize: 14 }}>
                <span style={{ color: "var(--brand)" }}>+</span> {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NON-HUMAN */}
      <section className="section-sm">
        <div className="container">
          <div className="card-dark" style={{ padding: mobile ? 28 : 48, position: "relative", overflow: "hidden" }}>
            <div className="dotted" style={{ position: "absolute", inset: 0, opacity: .3 }} />
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 32, alignItems: "center" }}>
              <div>
                <Stamp color="purple">{lang === "zh" ? "非人类档案" : "NON-HUMAN FILES"}</Stamp>
                <h3 className="h-section" style={{ marginTop: 14 }}>{t("employees.nonHumanTitle")}</h3>
                <p style={{ color: "var(--ink-2)", marginTop: 14, fontSize: 16, lineHeight: 1.6 }}>{t("employees.nonHumanSub")}</p>
                <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
                  <button onClick={() => go("how")} className="btn btn-primary btn-sm">{t("common.trialChat")} →</button>
                  <button onClick={() => go("how")} className="btn btn-ghost btn-sm">{t("common.learnMore")}</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {[
                  { e: "🐱", t: lang === "zh" ? "肉松 · 陪聊" : "Floof · Companion", color: "#F2C94C" },
                  { e: "🦖", t: lang === "zh" ? "雷克斯 · 创意" : "Rex · Creative", color: "#3BCB7A" },
                  { e: "🌵", t: lang === "zh" ? "刺刺 · 文档" : "Spike · Docs", color: "#A8B0C3" },
                  { e: "🐧", t: lang === "zh" ? "波波 · 吉祥物" : "Po · Mascot", color: "#4DA3FF" },
                ].map((it, i) => (
                  <div key={i} style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 14, padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
                    <Avatar emoji={it.e} color={it.color} />
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{it.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// =================== PRODUCT ===================
function ProductPage() {
  const { t, lang } = useI18n();
  const { go, mobile } = useRouter();
  return (
    <main>
      <section style={{ padding: mobile ? "32px 0" : "56px 0", borderBottom: "1px dashed var(--line)" }}>
        <div className="container">
          <Stamp>{t("product.eyebrow")}</Stamp>
          <h1 className="h-display" style={{ marginTop: 16 }}>{t("product.title")}</h1>
          <p style={{ color: "var(--ink-1)", fontSize: mobile ? 16 : 18, lineHeight: 1.65, maxWidth: 640, marginTop: 18 }}>{t("product.sub")}</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <SectionHeader eyebrow={lang === "zh" ? "主路径" : "Core Journey"} title={t("product.coreTitle")} num="A" />
          <CoreJourney steps={t("product.coreSteps")} lang={lang} mobile={mobile} />
        </div>
      </section>

      <section className="section-sm" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader eyebrow={lang === "zh" ? "拟人化机制" : "Personification"} title={t("product.mechTitle")} num="B" />
          <MechanicsGrid lang={lang} mobile={mobile} />
        </div>
      </section>

      <SecretarySpotlight />

      <section className="section-sm">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            <div className="card-dark" style={{ padding: 28 }}>
              <Stamp color="green">{t("product.avail.title")}</Stamp>
              <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
                {t("product.avail.items").map((it, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15 }}>
                    <span style={{ color: "var(--ok)", fontFamily: "var(--font-mono)" }}>✓</span> {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-dark" style={{ padding: 28, opacity: .9 }}>
              <Stamp color="blue">{t("product.coming.title")}</Stamp>
              <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
                {t("product.coming.items").map((it, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ink-1)" }}>
                    <span style={{ color: "var(--info)", fontFamily: "var(--font-mono)" }}>○</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{
            marginTop: 28, paddingTop: 20,
            borderTop: "1px dashed var(--line-soft)",
            textAlign: "center",
            color: "var(--ink-1)", fontSize: 15, lineHeight: 1.6,
          }}>
            {t("product.closing")}
          </div>
        </div>
      </section>
    </main>
  );
}

// =================== HOW IT WORKS ===================
function HowPage() {
  const { t, lang } = useI18n();
  const { go, mobile } = useRouter();
  const colors = ["var(--brand)", "var(--ok)", "var(--plum)", "var(--info)"];
  return (
    <main>
      <section style={{ padding: mobile ? "32px 0" : "56px 0", borderBottom: "1px dashed var(--line)" }}>
        <div className="container">
          <Stamp>{t("how.eyebrow")}</Stamp>
          <h1 className="h-display" style={{ marginTop: 16 }}>{t("how.title")}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 18 }}>
            {t("how.blocks").map((b, i) => (
              <div key={i} className="card-dark lift" style={{ padding: 32, position: "relative", overflow: "hidden" }}>
                <div className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".18em" }}>RULE 0{i+1}</div>
                <Stamp style={{ borderColor: colors[i], color: colors[i], marginTop: 12 }}>{b.tag}</Stamp>
                <h3 style={{ fontSize: 26, marginTop: 14, fontWeight: 800, letterSpacing: "-.01em" }}>{b.t}</h3>
                <p style={{ color: "var(--ink-1)", marginTop: 14, lineHeight: 1.7, fontSize: 15.5 }}>{b.d}</p>
                {/* small visual at bottom */}
                {i === 0 && <PaystubMini />}
                {i === 1 && <div style={{ marginTop: 22 }}><EnergyBar value={42} /></div>}
                {i === 2 && <MoodDemo />}
                {i === 3 && <LoafingScene />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
function LoafingScene() {
  return (
    <div style={{ marginTop: 22, padding: 14, borderRadius: 8, background: "var(--bg-1)", border: "1px solid var(--line)", fontFamily: "var(--font-mono)", fontSize: 11.5, lineHeight: 1.7, color: "var(--ink-2)" }}>
      <div>11:42 — 🦥 {lang === "zh" ? "周三省 又去「上厕所」了" : "Sammy Z. went to \"the bathroom\" again"}</div>
      <div>11:55 — 📋 {lang === "zh" ? "吴所谓 把会议纪要简成了 5 个字" : "Casey shrunk the meeting note down to 5 words"}</div>
      <div>12:01 — 📈 {lang === "zh" ? "李加班 又发了 3 条励志金句" : "Wade Liu sent 3 motivational quotes"}</div>
      <div style={{ color: "var(--ink-3)" }}>12:03 — {lang === "zh" ? "办公室氛围：混乱中性" : "Office vibe: chaotic neutral"}</div>
    </div>
  );
}

// =================== USE CASES === moved to js/cases-page.jsx ===

// =================== PRICING === moved to js/pricing-page.jsx ===

// =================== FAQ ===================
function FaqPage() {
  const { t, lang } = useI18n();
  const { mobile } = useRouter();
  const [open, setOpen] = useStateP({});
  return (
    <main>
      <section style={{ padding: mobile ? "32px 0" : "56px 0", borderBottom: "1px dashed var(--line)" }}>
        <div className="container">
          <Stamp>{t("faq.eyebrow")}</Stamp>
          <h1 className="h-display" style={{ marginTop: 16 }}>{t("faq.title")}</h1>
        </div>
      </section>
      <section className="section-sm">
        <div className="container-narrow">
          {t("faq.cats").map((cat, ci) => (
            <div key={ci} style={{ marginTop: ci === 0 ? 0 : 40 }}>
              <div
                className={lang === "zh" ? undefined : "t-eyebrow"}
                style={lang === "zh"
                  ? { marginBottom: 14, fontSize: 15, color: "var(--brand)", letterSpacing: ".02em", fontWeight: 600 }
                  : { marginBottom: 14 }
                }
              >{cat.name}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {cat.items.map((q, qi) => {
                  const k = `${ci}-${qi}`;
                  const isOpen = !!open[k];
                  return (
                    <button key={qi} onClick={() => setOpen(o => ({ ...o, [k]: !o[k] }))} style={{
                      all: "unset", cursor: "pointer", display: "block",
                      background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12,
                      padding: "18px 22px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                        <span style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.5 }}>{q.q}</span>
                        <span style={{ color: "var(--brand)", fontFamily: "var(--font-mono)", fontSize: 18, lineHeight: 1.4, flexShrink: 0 }}>{isOpen ? "−" : "+"}</span>
                      </div>
                      {isOpen && (
                        <div style={{
                          color: "var(--ink-1)", marginTop: 14, fontSize: 14.5, lineHeight: 1.7,
                          whiteSpace: "pre-line",
                        }}>{q.a}</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// AboutPage moved to js/about.jsx
Object.assign(window, { EmployeesPage, ProductPage, HowPage, FaqPage });
