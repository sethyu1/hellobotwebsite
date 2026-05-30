/* Home page */
const { useState: useStateH, useEffect: useEffectH } = React;

function HomePage() {
  const { t, lang } = useI18n();
  const { go, mobile } = useRouter();
  const heroVariant = window.HB_TWEAKS?.heroVariant || "A";

  // Mobile: keep only the 5 highest-value sections to reduce information density.
  if (mobile) {
    return (
      <main>
        <Hero variant={heroVariant} />
        <CoreMechanics />
        <WeeklyDiary />
        <UseCasesPreview />
        <FinalCTA />
      </main>
    );
  }

  return (
    <main>
      <Hero variant={heroVariant} />
      <CompanyTicker />
      <CoreMechanics />
      <FlowFourSteps />
      <Differentiation />
      <WeeklyDiary />
      <UseCasesPreview />
      <InterfacePreview />
      <FinalCTA />
    </main>
  );
}

// =================== HERO ===================
function Hero({ variant }) {
  const { t, lang } = useI18n();
  const { go, mobile } = useRouter();
  const candidates = window.HB_CANDIDATES.slice(0, 3);

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: mobile ? "40px 0 24px" : "72px 0 48px" }}>
      {/* Background grid + radial spotlight */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: .55 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(80% 60% at 70% 0%, rgba(255,138,61,.12), transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 40% at 10% 100%, rgba(77,163,255,.08), transparent 60%)" }} />

      <div className="container" style={{ position: "relative", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.05fr 1fr", gap: mobile ? 36 : 48, alignItems: "center" }}>
        {/* Left */}
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
            <Stamp color="orange">{t("hero.eyebrow")}</Stamp>
            <span className="blink" style={{ width: 8, height: 8, borderRadius: 99, background: "var(--ok)" }} />
            <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".15em" }}>{lang === "zh" ? "招聘进行中" : "HIRING NOW"}</span>
          </div>

          <h1 className="h-display" style={{ margin: 0 }}>
            <div style={{ color: "var(--ink-0)" }}>{t("hero.title1")}</div>
            <div>
              <span style={{ color: "var(--brand)" }}>{t("hero.title2")}</span>
            </div>
          </h1>

          <p style={{ color: "var(--ink-1)", fontSize: mobile ? 16 : 18, lineHeight: 1.65, marginTop: 22, maxWidth: 520 }}>
            {t("hero.sub")}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button onClick={() => window.open("https://tally.so/r/LZkX41", "_blank", "noopener,noreferrer")} className="btn btn-primary">{t("common.tryNow")} →</button>
            <button onClick={() => go("employees")} className="btn btn-ghost">{t("common.viewEmployees")}</button>
          </div>

          {/* Stat strip */}
          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: mobile ? 8 : 16, paddingTop: 22, borderTop: "1px dashed var(--line)" }}>
            {[t("hero.stat1"), t("hero.stat2"), t("hero.stat3")].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase" }}>0{i+1}</div>
                <div style={{ fontSize: mobile ? 13 : 14, color: "var(--ink-1)", marginTop: 4 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — composition of 3 cards */}
        <HeroComposition candidates={candidates} mobile={mobile} />
      </div>
    </section>
  );
}

function HeroComposition({ candidates, mobile }) {
  const { lang } = useI18n();
  return (
    <div style={{ position: "relative", height: mobile ? 540 : 580 }}>
      {/* Backdrop ID tag */}
      <div style={{
        position: "absolute", top: 0, right: mobile ? 0 : 0, transform: "rotate(3deg)",
        width: mobile ? 230 : 260, opacity: .85, zIndex: 1,
      }}>
        <PunchCard candidate={candidates[1]} />
      </div>

      {/* Main candidate card */}
      <div style={{
        position: "absolute", top: mobile ? 56 : 60, left: mobile ? 0 : 0,
        width: mobile ? 280 : 320, transform: "rotate(-2deg)", zIndex: 3,
      }}>
        <CandidateCard c={candidates[0]} onClick={() => {}} />
      </div>

      {/* Office chat preview */}
      <div style={{
        position: "absolute", bottom: 0, right: mobile ? 12 : 24,
        width: mobile ? 250 : 290, transform: "rotate(3deg)", zIndex: 2,
      }}>
        <ChatPreview candidate={candidates[2]} />
      </div>

      {/* Floating sticky note */}
      <div style={{
        position: "absolute", top: mobile ? 360 : 380, left: mobile ? 200 : 270,
        width: 150, padding: "12px 14px",
        background: "#FFE38A", color: "#3a2e08", borderRadius: 4,
        fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.5,
        transform: "rotate(-6deg)", boxShadow: "0 12px 28px rgba(0,0,0,.4)", zIndex: 4,
      }}>
        ★ {lang === "zh" ? "记得给周三省加薪" : "Remember to give Sammy a raise"}
      </div>
    </div>
  );
}

function PunchCard({ candidate }) {
  const { lang } = useI18n();
  return (
    <div style={{ background: "var(--bg-paper-2)", borderRadius: 6, position: "relative", boxShadow: "var(--shadow-paper)", color: "var(--ink-paper)" }}>
      <div className="perf-paper-top" style={{ background: "var(--bg-paper-2)", backgroundImage: "radial-gradient(circle, var(--bg-1) 38%, transparent 40%)", backgroundSize: "14px 14px", backgroundPosition: "0 6px", backgroundRepeat: "repeat-x" }} />
      <div style={{ padding: "16px 18px 18px" }}>
        <div className="t-mono" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--ink-paper-2)" }}>
          {lang === "zh" ? "考勤卡 · 第 41 周" : "TIMECARD · WEEK 41"}
        </div>
        <div style={{ fontWeight: 800, fontSize: 17, marginTop: 6, letterSpacing: "-.01em" }}>
          {lang === "zh" ? candidate.nameZh : candidate.nameEn}
          <span style={{ marginLeft: 6, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-paper-2)" }}>· {candidate.id}</span>
        </div>
        <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.7, color: "var(--ink-paper)" }}>
          <div>MON  09:14 — 17:42  <span style={{ color: "var(--bad)" }}>{lang === "zh" ? "(摸鱼 2h)" : "(loafed 2h)"}</span></div>
          <div>TUE  10:21 — 18:08</div>
          <div>WED  09:02 — 12:55  <span style={{ color: "var(--warn)" }}>{lang === "zh" ? "(早退)" : "(left early)"}</span></div>
          <div>THU  ——————————</div>
          <div>FRI  ——————————</div>
        </div>
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stamp color="paper" rotate>{lang === "zh" ? "迟到 1 次" : "1 LATE"}</Stamp>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-paper-2)" }}>HR-APPROVED</span>
        </div>
      </div>
    </div>
  );
}

function ChatPreview({ candidate }) {
  const { lang } = useI18n();
  return (
    <div className="card-dark" style={{ padding: 14, background: "var(--bg-3)", border: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, borderBottom: "1px solid var(--line)" }}>
        <Avatar emoji={candidate.emoji} color={candidate.color} size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{lang === "zh" ? candidate.nameZh : candidate.nameEn}</div>
          <div style={{ fontSize: 10.5, fontFamily: "var(--font-mono)", color: "var(--ok)", letterSpacing: ".12em" }}>● {lang === "zh" ? "在岗" : "ON DUTY"}</div>
        </div>
        <Stamp color="orange" style={{ fontSize: 9 }}>{lang === "zh" ? "已雇佣" : "HIRED"}</Stamp>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "12px 0", fontSize: 13 }}>
        <Bubble side="them">{lang === "zh" ? "今天能加班吗？" : "Can you work overtime today?"}</Bubble>
        <Bubble side="me">{lang === "zh" ? "不能。我的精力只剩 30%。" : "No. My energy is at 30%."}</Bubble>
        <Bubble side="them">{lang === "zh" ? "...那你给我整段文案" : "...just write me the copy then"}</Bubble>
      </div>
      <div style={{ paddingTop: 10, borderTop: "1px dashed var(--line)" }}>
        <EnergyBar value={30} />
      </div>
    </div>
  );
}
function Bubble({ side, children }) {
  const me = side === "me";
  return (
    <div style={{ alignSelf: me ? "flex-end" : "flex-start", maxWidth: "82%" }}>
      <div style={{
        background: me ? "var(--brand)" : "var(--bg-1)", color: me ? "var(--brand-ink)" : "var(--ink-0)",
        padding: "8px 12px", borderRadius: 12,
        borderBottomRightRadius: me ? 4 : 12, borderBottomLeftRadius: me ? 12 : 4,
        fontSize: 12.5, lineHeight: 1.45,
      }}>{children}</div>
    </div>
  );
}

// =================== TICKER ===================
function CompanyTicker() {
  const { lang } = useI18n();
  const items = lang === "zh" ? [
    "周三省 · 摸鱼 2h", "李加班 · 已完成 3 份报表", "陈不语 · 翻译 1240 字", "顾对齐 · 改稿 7 版",
    "吴所谓 · 速览 5 篇", "雷克斯 · 又在咆哮", "韩有序 · 整理 SOP 12 份", "王能说 · 处理客诉 18 单",
  ] : [
    "Sammy · Loafed 2h", "Wade · Shipped 3 reports", "Mira · Translated 1,240 words", "Kira · Revised v7",
    "Casey · Skimmed 5 briefs", "Rex · Roaring again", "Holly · Filed 12 SOPs", "Jamie · Closed 18 tickets",
  ];
  return (
    <div style={{ borderTop: "1px dashed var(--line)", borderBottom: "1px dashed var(--line)", padding: "16px 0", background: "var(--bg-2)" }}>
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...items, ...items, ...items].map((it, i) => (
            <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)", letterSpacing: ".05em" }}>
              <span style={{ color: "var(--brand)", marginRight: 8 }}>●</span>{it}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// =================== CORE MECHANICS ===================
function CoreMechanics() {
  const { t, lang } = useI18n();
  const { mobile } = useRouter();
  const items = t("home.mech.items");
  const colors = ["var(--brand)", "var(--ok)", "var(--info)", "var(--plum)"];
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={t("home.mech.eyebrow")} title={t("home.mech.title")} num="01" />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 18, marginTop: 36 }}>
          {items.map((it, i) => (
            <div key={i} className="card-dark lift" style={{ padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Stamp style={{ borderColor: colors[i], color: colors[i] }}>{it.tag}</Stamp>
                <span className="t-mono" style={{ color: "var(--ink-3)", fontSize: 11 }}>0{i+1}/04</span>
              </div>
              <h3 style={{ fontSize: 26, marginTop: 18, fontWeight: 700, letterSpacing: "-.01em" }}>{it.title}</h3>
              <p style={{ color: "var(--ink-2)", marginTop: 10, lineHeight: 1.65, fontSize: 15 }}>{it.desc}</p>
              {/* Mini visual per card */}
              {i === 0 && <TierLadder />}
              {i === 1 && <PaystubMini />}
              {i === 2 && <EnergyDemo />}
              {i === 3 && <MoodDemo />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TierLadder() {
  const { lang } = useI18n();
  const tiers = lang === "zh"
    ? ["大专","普本","211","985","硕士","博士","院士"]
    : ["AA","BA","Big Ten","Ivy+","MA","PhD","Fellow"];
  return (
    <div style={{ marginTop: 22, display: "flex", gap: 4, alignItems: "flex-end", height: 60 }}>
      {tiers.map((t, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", height: 8 + i * 7, background: i === 6 ? "var(--brand)" : "rgba(255,138,61,.25)", borderRadius: 3 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--ink-3)" }}>{t}</span>
        </div>
      ))}
    </div>
  );
}
function PaystubMini() {
  const { lang } = useI18n();
  return (
    <div className="paper" style={{ marginTop: 20, padding: "12px 14px", color: "var(--ink-paper)" }}>
      <div className="t-mono" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--ink-paper-2)" }}>
        {lang === "zh" ? "工资条 · W47" : "PAYSTUB · W47"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 12 }}>
        <span>{lang === "zh" ? "基本工资" : "Base"}</span><span>{lang === "zh" ? "2,990 Cr" : "2,990 Cr"}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 12 }}>
        <span>{lang === "zh" ? "情绪奖" : "Mood bonus"}</span><span>{lang === "zh" ? "+150 Cr" : "+150 Cr"}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--line-paper)", fontWeight: 800 }}>
        <span>{lang === "zh" ? "实发" : "Net"}</span><span>{lang === "zh" ? "3,140 Cr" : "3,140 Cr"}</span>
      </div>
    </div>
  );
}
function EnergyDemo() {
  const [v, setV] = useStateH(70);
  useEffectH(() => {
    const id = setInterval(() => setV(x => Math.max(8, x - 7 < 8 ? 70 : x - 7)), 800);
    return () => clearInterval(id);
  }, []);
  return <div style={{ marginTop: 22 }}><EnergyBar value={v} /></div>;
}
function MoodDemo() {
  const moods = ["😊","🙂","😐","🙃","😤","😩"];
  const [i, setI] = useStateH(0);
  useEffectH(() => {
    const id = setInterval(() => setI(x => (x + 1) % moods.length), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ marginTop: 22, display: "flex", gap: 8, alignItems: "center" }}>
      {moods.map((m, k) => (
        <div key={k} style={{
          width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center", fontSize: 18,
          background: k === i ? "var(--brand)" : "var(--bg-3)",
          border: "1px solid " + (k === i ? "var(--brand)" : "var(--line)"),
          transition: "background .2s, border-color .2s",
        }}>{m}</div>
      ))}
    </div>
  );
}

function SectionHeader({ eyebrow, title, num, center }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, textAlign: center ? "center" : "left" }}>
      <div style={{ maxWidth: 720 }}>
        <Stamp>{eyebrow}</Stamp>
        <h2 className="h-section" style={{ marginTop: 16, marginBottom: 0, textWrap: "pretty" }}>{title}</h2>
      </div>
      {num && <div className="t-mono" style={{ color: "var(--ink-3)", fontSize: 12, letterSpacing: ".18em" }}>SEC // {num}</div>}
    </div>
  );
}

// =================== FLOW 4 STEPS ===================
function FlowFourSteps() {
  const { t, lang } = useI18n();
  const { mobile } = useRouter();
  const steps = t("home.flow.steps");
  return (
    <section className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line-soft)" }}>
      <div className="container">
        <SectionHeader eyebrow={t("home.flow.eyebrow")} title={t("home.flow.title")} num="02" />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)", gap: mobile ? 14 : 16, marginTop: 40, position: "relative" }}>
          {steps.map((s, i) => (
            <div key={i} className="paper" style={{ padding: 22, position: "relative" }}>
              <div className="t-mono" style={{ fontSize: 11, color: "var(--ink-paper-2)", letterSpacing: ".2em" }}>STEP {s.n}</div>
              <h4 style={{ marginTop: 8, fontSize: 20, fontWeight: 800, color: "var(--ink-paper)" }}>{s.t}</h4>
              <p style={{ marginTop: 8, fontSize: 13.5, color: "var(--ink-paper-2)", lineHeight: 1.6 }}>{s.d}</p>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px dashed var(--line-paper)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-paper-2)" }}>FORM-A{i+1}</span>
                <span style={{ fontSize: 18 }}>{["📋","💬","💸","📊"][i]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== DIFFERENTIATION ===================
function Differentiation() {
  const { t, lang } = useI18n();
  const { mobile } = useRouter();
  const items = t("home.diff.items");
  const icons = ["👤","🔋","🏢","🎭"];
  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={t("home.diff.eyebrow")} title={t("home.diff.title")} num="03" />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 18, marginTop: 36 }}>
          {items.map((it, i) => (
            <div key={i} className="card-dark lift" style={{ padding: 28, display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--bg-3)", display: "grid", placeItems: "center", fontSize: 28, border: "1px solid var(--line)" }}>{icons[i]}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 19, fontWeight: 700, margin: 0 }}>{it.t}</h4>
                <p style={{ color: "var(--ink-2)", marginTop: 6, lineHeight: 1.6, fontSize: 14.5 }}>{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =================== USE CASES PREVIEW ===================
function UseCasesPreview() {
  const { t } = useI18n();
  const { go, mobile } = useRouter();
  const items = t("home.cases.items");
  const tints = ["var(--brand)","var(--ok)","var(--info)","var(--plum)"];
  return (
    <section className="section" style={{ background: "var(--bg-0)" }}>
      <div className="container">
        <SectionHeader eyebrow={t("home.cases.eyebrow")} title={t("home.cases.title")} num="04" />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)", gap: 14, marginTop: 36 }}>
          {items.map((it, i) => (
            <div key={i} className="card-dark lift" style={{ padding: 24, position: "relative" }}>
              <div style={{ height: 4, width: 36, background: tints[i], borderRadius: 4 }} />
              <h4 style={{ marginTop: 18, fontSize: 18, fontWeight: 700 }}>{it.t}</h4>
              <p style={{ color: "var(--ink-2)", marginTop: 8, fontSize: 13.5, lineHeight: 1.6 }}>{it.d}</p>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 22, paddingTop: 18,
          borderTop: "1px dashed var(--line-soft)",
          textAlign: "center",
          color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6,
        }}>{t("home.cases.more")}</div>
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <button onClick={() => go("cases")} className="btn btn-ghost btn-sm">{t("common.learnMore")} →</button>
        </div>
      </div>
    </section>
  );
}

// =================== INTERFACE PREVIEW ===================
function InterfacePreview() {
  const { lang } = useI18n();
  const { mobile } = useRouter();
  // Real phone screenshots — drop the 4 PNGs into uploads/ at these paths.
  const screens = lang === "zh" ? [
    { src: "uploads/preview-recruit.png", title: "招聘", caption: "人才市场 · 浏览候选人" },
    { src: "uploads/preview-profile.png", title: "候选人档案", caption: "履历 · 技能 · 核心属性" },
    { src: "uploads/preview-chat.png",    title: "工作台",     caption: "试聊 · 实际交付任务" },
    { src: "uploads/preview-company.png", title: "我的公司",   caption: "团队 · 余额 · 周薪" },
  ] : [
    { src: "uploads/preview-recruit-en.png", title: "Recruit",    caption: "Talent marketplace · browse candidates" },
    { src: "uploads/preview-profile-en.png", title: "Profile",    caption: "Résumé · skills · core traits" },
    { src: "uploads/preview-chat-en.png",    title: "Workbench",  caption: "Trial chat · actual delivery" },
    { src: "uploads/preview-company-en.png", title: "My Company", caption: "Team · balance · weekly payroll" },
  ];

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow={lang === "zh" ? "界面预览" : "Interface Preview"}
          title={lang === "zh" ? "你将看到的，不只是一个输入框" : "What you'll see is more than an input box"}
          num="05"
        />
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: mobile ? 12 : 18,
          marginTop: 36,
          alignItems: "start",
        }}>
          {screens.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="t-mono" style={{
                fontSize: 10, color: "var(--ink-3)", letterSpacing: ".18em",
                alignSelf: "stretch", textAlign: "left", marginLeft: mobile ? 4 : 8, marginBottom: 10,
              }}>SCREEN.{i+1}</div>
              <img
                src={s.src}
                alt={s.title}
                loading="lazy"
                style={{
                  width: "100%", height: "auto",
                  display: "block",
                  borderRadius: 22,
                  filter: "drop-shadow(0 12px 30px rgba(0,0,0,.5))",
                }}
                onError={(e) => {
                  // graceful placeholder if file not yet dropped in
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "grid";
                }}
              />
              <div style={{
                display: "none", aspectRatio: "9 / 19.5", width: "100%",
                placeItems: "center", textAlign: "center",
                background: "var(--bg-2)", border: "1px dashed var(--line)",
                borderRadius: 22, color: "var(--ink-3)",
                fontFamily: "var(--font-mono)", fontSize: 11, padding: 16, lineHeight: 1.6,
              }}>
                <div>{s.src}<br/>(尚未上传 / not yet uploaded)</div>
              </div>
              <div style={{
                marginTop: 14, fontSize: mobile ? 13 : 15,
                fontWeight: 700, color: "var(--ink-0)",
                lang: lang === "zh" ? undefined : "en",
              }}>{s.title}</div>
              <div style={lang === "zh"
                ? { marginTop: 4, fontSize: 12.5, color: "var(--ink-2)", letterSpacing: ".02em", textAlign: "center" }
                : { marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".05em", textAlign: "center" }
              }>{s.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// =================== FINAL CTA ===================
function FinalCTA() {
  const { t } = useI18n();
  const { go, mobile } = useRouter();
  return (
    <section className="section">
      <div className="container">
        <div className="paper" style={{ padding: mobile ? "32px 24px" : "56px 56px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 14, right: 18, transform: "rotate(8deg)" }}>
            <Stamp color="paper" rotate>{t.toString && (useI18n().lang === "zh" ? "盖章生效" : "STAMPED")}</Stamp>
          </div>
          {(() => {
            const lang = useI18n().lang;
            return (
              <div
                className={lang === "zh" ? undefined : "t-mono"}
                style={lang === "zh"
                  ? { fontSize: 13, color: "var(--ink-paper)", letterSpacing: ".02em", fontWeight: 600 }
                  : { fontSize: 11, color: "var(--ink-paper-2)", letterSpacing: ".2em" }
                }>
                <span style={{ fontFamily: "var(--font-mono)" }}>FORM 0428-A</span> · {lang === "zh" ? "雇主表" : "EMPLOYER FORM"}
              </div>
            );
          })()}
          <h2 className="h-section" style={{ color: "var(--ink-paper)", marginTop: 14, maxWidth: 640 }}>{t("home.finalCta.title")}</h2>
          <p style={{ color: "var(--ink-paper-2)", marginTop: 14, fontSize: 17, lineHeight: 1.6, maxWidth: 560 }}>{t("home.finalCta.sub")}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button onClick={() => window.open("https://tally.so/r/LZkX41", "_blank", "noopener,noreferrer")} className="btn btn-paper">{t("common.tryNow")} →</button>
            <button onClick={() => window.open("https://tally.so/r/LZkX41", "_blank", "noopener,noreferrer")} className="btn" style={{ background: "transparent", color: "var(--ink-paper)", border: "1px solid var(--ink-paper)" }}>{t("common.joinWaitlist")}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.HomePage = HomePage;
window.SectionHeader = SectionHeader;
