// HelloBot Pricing — Plans + Bot weekly salary
// Top: 3 subscription plans (Starter ¥68 / Pro ¥298 / Team ¥698)
// Bottom: 4 Bot tiers weekly salary in Credits
// Below: where money goes / billing in three lines / mini FAQ

const { useState: useStatePR } = React;

const PR_C = {
  zh: {
    eyebrow: "定价 / PRICING",
    title: "像养团队一样订阅，像发工资一样使用",
    sub: "订阅 Plan 获得 Credits，用来雇佣 Bot、支付周薪和补充精力。\n你不是为每一句回答付费，而是为持续交付的 AI 员工付费",

    planEyebrow: "订阅 PLAN",
    planTitle: "选一档你今天需要的团队规模",
    planNote: "所有订阅每月发放 Credits，Credits 不清零（订阅期内累计可用）",

    plans: [
      { key: "starter", n: "Starter", credits: "10,000 Cr", price: "¥68", per: "/月",
        hire: "可雇 2 个高中 Bot / 1 个本科 Bot",
        bullets: [
          "适合个人尝鲜",
          "1 位执行型小助手",
          "试水秘书 / 内容 / 研究中的一个",
        ],
        cta: "开始 Starter",
      },
      { key: "pro", n: "Pro", credits: "45,000 Cr", price: "¥298", per: "/月", recommend: true,
        hire: "完整雇佣 4 个本科 Agent",
        bullets: [
          "推荐：完整 4 经理团队同时运转",
          "秘书 + 内容 + 研究 + 增长",
          "工作量饱和的个人创业者首选",
        ],
        cta: "开始 Pro",
      },
      { key: "team", n: "Team", credits: "120,000 Cr", price: "¥698", per: "/月",
        hire: "多 Agent 协同 / 高频任务",
        bullets: [
          "硕士级 Bot 长期常驻",
          "高频协作 · 多线推进",
          "适合小团队和重度工作流",
        ],
        cta: "开始 Team",
      },
    ],
    recommendBadge: "主推",

    salaryEyebrow: "BOT 周薪消耗",
    salaryTitle: "学历是能力包装",
    salarySub: "本质对应模型能力、任务复杂度与交付成本。Bot 雇佣后每周自动从订阅 Credits 中扣除工资",
    salaryHeadCols: ["学历", "周薪 (Cr/周)", "适合做什么"],
    salaryRows: [
      { tier: "高中", color: "#A8B0C3", price: "990",   desc: "基础对话、信息整理、轻文案",                 monthly: "≈ 4,290 Cr/月" },
      { tier: "本科", color: "#FF8A3D", price: "1,990", desc: "经理型主力：秘书 / 内容 / 研究 / 增长",       monthly: "≈ 8,620 Cr/月", primary: true },
      { tier: "211",  color: "#4DA3FF", price: "2,990", desc: "进阶分析：多任务协作、跨工具调度",            monthly: "≈ 12,950 Cr/月" },
      { tier: "985",  color: "#5CCE9A", price: "3,990", desc: "复杂决策：方案对比、资料核查、长链推理",       monthly: "≈ 17,290 Cr/月" },
      { tier: "硕士", color: "#B58CFF", price: "4,990", desc: "专业深耕：长报告、复杂分析、复盘",            monthly: "≈ 21,610 Cr/月" },
      { tier: "博士", color: "#FF5DA8", price: "6,990", desc: "战略级：研究、推理、跨领域整合",              monthly: "≈ 30,290 Cr/月" },
    ],
    salaryFootnote: "* 月度估算按 4.33 周计算，仅供参考。实际按周结算",

    matchTitle: "Plan × Bot 匹配速查",
    matchSub: "看你想养什么样的团队，再决定订哪一档",
    matchHead: ["", "Starter ¥68", "Pro ¥298", "Team ¥698"],
    matchRows: [
      { label: "高中 Bot · 990/周",   v: ["2",       "10+",       "27+"] },
      { label: "本科 Bot · 1,990/周", v: ["1 (短期)", "4 (饱和)",   "12+"] },
      { label: "211 Bot · 2,990/周",  v: ["—",       "3 (饱和)",   "8+"] },
      { label: "985 Bot · 3,990/周",  v: ["—",       "2 (饱和)",   "5+"] },
      { label: "硕士 Bot · 4,990/周", v: ["—",       "1 (饱和)",   "4 (长驻)"] },
      { label: "博士 Bot · 6,990/周", v: ["—",       "1 (短期)",   "3 (长驻)"] },
    ],

    explainTitle: "三句话计费",
    explainLines: [
      { tag: "01", t: "你订阅的是 Credits", d: "每月付订阅费，发到账户里的是 Credits。" },
      { tag: "02", t: "你支付的是周薪", d: "雇佣 Bot 后每周自动扣工资。学历决定档位。" },
      { tag: "03", t: "你管理的是节奏", d: "Bot 不工作的周可以暂停发薪，下次启用即可。" },
    ],

    faqTitle: "顺便回答几个常被问的",
    faq: [
      { q: "试聊需要花 Credits 吗？", a: "不需要。试聊免费，决定要不要雇佣再发薪。" },
      { q: "Credits 会过期吗？", a: "订阅期内累计不清零。停止订阅后 30 天内有效。" },
      { q: "可以中途升降档吗？", a: "可以，按比例补差或冲抵。" },
      { q: "会自动续费吗？", a: "默认开启月度续订，可在「我的公司」里随时关闭。" },
    ],

    ctaTitle: "先开 Pro，把 4 个经理一次养起来",
    ctaSub: "或者先 Starter ¥68，雇个秘书试试",
    ctaHire: "立即开始 →",
    ctaTalk: "联系我们",
  },
  en: {
    eyebrow: "Pricing",
    title: "Subscribe like a team. Spend like payroll",
    sub: "A Plan turns into Credits — used to hire Bots, pay weekly salaries, and refill energy.\nYou're not paying per reply. You're paying for AI employees that keep delivering",

    planEyebrow: "Plans",
    planTitle: "Pick the team size you need today",
    planNote: "Each plan grants monthly Credits. Unused Credits stay in your account during your subscription",

    plans: [
      { key: "starter", n: "Starter", credits: "10,000 Cr", price: "$19.99", per: "/mo",
        hire: "Hire 2 high-school Bots / 1 bachelor Bot",
        bullets: ["Solo experiments", "Single execution helper", "Try one of: COS / Content / Research"],
        cta: "Start Starter",
      },
      { key: "pro", n: "Pro", credits: "45,000 Cr", price: "$39.99", per: "/mo", recommend: true,
        hire: "Run all 4 bachelor Agents at full load",
        bullets: ["Recommended: full 4-manager team", "COS + Content + Research + Growth", "Best for serious solos"],
        cta: "Start Pro",
      },
      { key: "team", n: "Team", credits: "120,000 Cr", price: "$99.99", per: "/mo",
        hire: "Multi-agent coordination / heavy load",
        bullets: ["Master-tier Bots on payroll", "Multi-line work in parallel", "For small teams and heavy workflows"],
        cta: "Start Team",
      },
    ],
    recommendBadge: "BEST PICK",

    salaryEyebrow: "BOT WEEKLY SALARY",
    salaryTitle: "Degree = capability tier",
    salarySub: "It's a wrapper for model capability, task complexity, and delivery cost. Salary is deducted weekly from your Credits",
    salaryHeadCols: ["Tier", "Weekly (Cr/wk)", "Best for"],
    salaryRows: [
      { tier: "High School", color: "#A8B0C3", price: "990",   desc: "Basic chat, info gathering, light copy",                  monthly: "≈ 4,290 Cr/mo" },
      { tier: "Bachelor",    color: "#FF8A3D", price: "1,990", desc: "Manager workforce: COS / Content / Research / Growth",     monthly: "≈ 8,620 Cr/mo", primary: true },
      { tier: "Big Ten",     color: "#4DA3FF", price: "2,990", desc: "Senior IC: multi-task coordination, tool orchestration",   monthly: "≈ 12,950 Cr/mo" },
      { tier: "Ivy Plus",    color: "#5CCE9A", price: "3,990", desc: "Lead IC: option weighing, fact-checking, long reasoning",  monthly: "≈ 17,290 Cr/mo" },
      { tier: "Master",      color: "#B58CFF", price: "4,990", desc: "Specialist: long reports, deep analysis, post-mortems",    monthly: "≈ 21,610 Cr/mo" },
      { tier: "PhD",         color: "#FF5DA8", price: "6,990", desc: "Strategic: research, reasoning, cross-domain",             monthly: "≈ 30,290 Cr/mo" },
    ],
    salaryFootnote: "* Monthly estimate uses 4.33 weeks. Settlement is weekly",

    matchTitle: "Plan × Bot quick chart",
    matchSub: "What kind of team do you want? Then pick a plan",
    matchHead: ["", "Starter $19.99", "Pro $39.99", "Team $99.99"],
    matchRows: [
      { label: "High School · 990/wk",  v: ["2",         "10+",          "27+"] },
      { label: "Bachelor · 1,990/wk",   v: ["1 (short)", "4 (full)",     "12+"] },
      { label: "Big Ten · 2,990/wk",    v: ["—",         "3 (full)",     "8+"] },
      { label: "Ivy Plus · 3,990/wk",   v: ["—",         "2 (full)",     "5+"] },
      { label: "Master · 4,990/wk",     v: ["—",         "1 (full)",     "4 (full-time)"] },
      { label: "PhD · 6,990/wk",        v: ["—",         "1 (short)",    "3 (full-time)"] },
    ],

    explainTitle: "Billing in three lines",
    explainLines: [
      { tag: "01", t: "You subscribe to Credits", d: "Pay monthly. Credits land in your account." },
      { tag: "02", t: "You pay weekly salaries", d: "Each hired Bot draws their weekly salary automatically. Degree sets the rate." },
      { tag: "03", t: "You manage the cadence", d: "Pause payroll on slow weeks. Restart anytime." },
    ],

    faqTitle: "A few quick ones",
    faq: [
      { q: "Do trial chats cost Credits?", a: "No. Trials are free until you decide to hire." },
      { q: "Do Credits expire?", a: "They stay in your account during your subscription, plus 30 days after cancellation." },
      { q: "Can I switch plans mid-cycle?", a: "Yes. We prorate up and down." },
      { q: "Will I be auto-renewed?", a: "Yes by default. Turn it off any time in My Company." },
    ],

    ctaTitle: "Start with Pro — get all 4 managers running",
    ctaSub: "Or try Starter $19.99 and just hire the Chief of Staff",
    ctaHire: "Get started →",
    ctaTalk: "Contact us",
  },
};

// =================== Plan Card ===================
function PlanCard({ p, c, mobile }) {
  const rec = !!p.recommend;
  return (
    <div style={{
      position: "relative",
      borderRadius: 18,
      padding: mobile ? 24 : 30,
      background: rec ? "linear-gradient(180deg, rgba(181,140,255,.08), rgba(255,93,168,.04))" : "var(--bg-2)",
      border: rec ? "2px solid #B58CFF" : "1px solid var(--line)",
      boxShadow: rec ? "0 0 0 6px rgba(181,140,255,.10)" : "none",
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      {rec && (
        <span style={{
          position: "absolute", top: -12, left: 22,
          padding: "5px 12px", borderRadius: 6,
          background: "#B58CFF", color: "#0A0F22",
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 800, letterSpacing: ".2em",
        }}>● {c.recommendBadge}</span>
      )}

      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-.02em", color: rec ? "#B58CFF" : "var(--ink-0)" }}>{p.n}</div>
            <div className="t-mono" style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 2, fontWeight: 700, letterSpacing: ".05em" }}>{p.credits}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-.03em", color: rec ? "#B58CFF" : "var(--ink-0)" }}>{p.price}</span>
            <span className="t-mono" style={{ fontSize: 13, color: "var(--ink-2)", marginLeft: 4 }}>{p.per}</span>
          </div>
        </div>
      </div>

      {/* Hire line */}
      <div style={{
        padding: "12px 14px", borderRadius: 10,
        background: rec ? "rgba(181,140,255,.10)" : "rgba(255,255,255,.03)",
        border: rec ? "1px dashed #B58CFF" : "1px dashed var(--line)",
        fontSize: 14, fontWeight: 600, color: rec ? "#B58CFF" : "var(--ink-0)",
        lineHeight: 1.5,
      }}>{p.hire}</div>

      {/* Bullets */}
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {p.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--ink-1)", lineHeight: 1.55 }}>
            <span style={{ color: rec ? "#B58CFF" : "var(--brand)", marginTop: 2 }}>✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className={`btn btn-sm ${rec ? "btn-primary" : "btn-ghost"}`} style={{ marginTop: "auto", justifyContent: "center" }}>
        {p.cta}
      </button>
    </div>
  );
}

// =================== Salary Row ===================
function SalaryCard({ row, c, mobile, lang }) {
  const isPrimary = !!row.primary;
  return (
    <div style={{
      padding: mobile ? 18 : 16,
      borderRadius: 14,
      background: isPrimary ? "linear-gradient(180deg, rgba(255,138,61,.08), rgba(255,138,61,.02))" : "var(--bg-2)",
      border: isPrimary ? "1px solid var(--brand)" : "1px solid var(--line)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: row.color,
      }} />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 6 }}>
        <div className="t-mono" style={{
          fontSize: 11, color: row.color, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase",
        }}>{row.tier}</div>
        {isPrimary && (
          <span className="t-mono" style={{
            fontSize: 9, padding: "2px 5px", borderRadius: 3, fontWeight: 800, letterSpacing: ".1em",
            background: "var(--brand)", color: "#000",
          }}>{lang === "zh" ? "经理档" : "MGR"}</span>
        )}
      </div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 4, flexWrap: "wrap" }}>
        <span style={{ fontSize: mobile ? 36 : 28, fontWeight: 800, letterSpacing: "-.02em", color: row.color, lineHeight: 1 }}>{row.price}</span>
        <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>Cr / {lang === "zh" ? "周" : "wk"}</span>
      </div>
      <div className="t-mono" style={{ marginTop: 4, fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".04em" }}>{row.monthly}</div>
      <div style={{
        marginTop: 12, paddingTop: 10,
        borderTop: "1px dashed var(--line)",
        fontSize: 12.5, color: "var(--ink-1)", lineHeight: 1.5,
      }}>{row.desc}</div>
    </div>
  );
}

// =================== Match Matrix ===================
function MatchMatrix({ c, mobile }) {
  return (
    <div style={{
      borderRadius: 14,
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      overflow: "hidden",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
        background: "rgba(0,0,0,.18)",
      }}>
        {c.matchHead.map((h, i) => (
          <div key={i} className="t-mono" style={{
            padding: "14px 16px",
            fontSize: 11, fontWeight: 800, letterSpacing: ".15em",
            color: i === 2 ? "#B58CFF" : i === 0 ? "var(--ink-3)" : "var(--ink-1)",
            borderRight: i < 3 ? "1px solid var(--line)" : "none",
            background: i === 2 ? "rgba(181,140,255,.06)" : "transparent",
          }}>{h.toUpperCase()}</div>
        ))}
      </div>
      {c.matchRows.map((r, ri) => (
        <div key={ri} style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          borderTop: "1px solid var(--line-soft)",
        }}>
          <div style={{ padding: "14px 16px", fontSize: 13.5, color: "var(--ink-0)", fontWeight: 600, borderRight: "1px solid var(--line-soft)" }}>{r.label}</div>
          {r.v.map((v, vi) => (
            <div key={vi} className="t-mono" style={{
              padding: "14px 16px", fontSize: 14,
              color: v === "—" ? "var(--ink-3)" : vi === 1 ? "#B58CFF" : "var(--ink-0)",
              fontWeight: vi === 1 ? 800 : 600,
              background: vi === 1 ? "rgba(181,140,255,.05)" : "transparent",
              borderRight: vi < 2 ? "1px solid var(--line-soft)" : "none",
            }}>{v}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// =================== FAQ Accordion (mobile) ===================
function FaqAccordion({ items }) {
  const [open, setOpen] = useStatePR(-1);
  return (
    <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <button key={i} onClick={() => setOpen(isOpen ? -1 : i)} style={{
            all: "unset", cursor: "pointer", display: "block",
            background: "var(--bg-2)", border: "1px solid var(--line)",
            borderRadius: 12, padding: "14px 16px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>{f.q}</span>
              <span style={{ color: "var(--brand)", fontFamily: "var(--font-mono)", fontSize: 18, flexShrink: 0 }}>{isOpen ? "−" : "+"}</span>
            </div>
            {isOpen && <div style={{ color: "var(--ink-1)", marginTop: 12, fontSize: 13.5, lineHeight: 1.65 }}>{f.a}</div>}
          </button>
        );
      })}
    </div>
  );
}

// =================== MAIN ===================
function PricingPageNew() {
  const { lang } = useI18n();
  const { mobile, go } = useRouter();
  const c = PR_C[lang] || PR_C.en;

  return (
    <main>
      {/* Hero */}
      <section style={{
        padding: mobile ? "32px 0 24px" : "60px 0 30px",
        borderBottom: "1px dashed var(--line)",
      }}>
        <div className="container">
          <Stamp>{c.eyebrow}</Stamp>
          <h1 className="h-display" style={{
            marginTop: 16, fontSize: mobile ? 36 : 56, lineHeight: 1.05, letterSpacing: "-.02em",
          }}>{c.title}</h1>
          <p style={{
            marginTop: 18, color: "var(--ink-1)", fontSize: mobile ? 15 : 17.5,
            lineHeight: 1.7, maxWidth: 720,
            whiteSpace: "pre-line", textWrap: "pretty",
          }}>{c.sub}</p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-sm">
        <div className="container">
          <SectionHeader eyebrow={c.planEyebrow} title={c.planTitle} num="01" />
          <p style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 13.5 }}>{c.planNote}</p>
          <div style={{
            marginTop: 28, display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: mobile ? 20 : 18,
            alignItems: "stretch",
          }}>
            {c.plans.map(p => <PlanCard key={p.key} p={p} c={c} mobile={mobile} />)}
          </div>
        </div>
      </section>

      {/* Bot Salary */}
      <section className="section-sm" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader eyebrow={c.salaryEyebrow} title={c.salaryTitle} num="02" />
          <p style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, maxWidth: 720 }}>{c.salarySub}</p>
          <div style={{
            marginTop: 28, display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(6, 1fr)",
            gap: 12,
          }}>
            {c.salaryRows.map((r, i) => <SalaryCard key={i} row={r} c={c} mobile={mobile} lang={lang} />)}
          </div>
          <div className="t-mono" style={{ marginTop: 18, fontSize: 11, color: "var(--ink-3)", letterSpacing: ".05em" }}>
            {c.salaryFootnote}
          </div>
        </div>
      </section>

      {/* Match Matrix — desktop only (too dense for mobile) */}
      {!mobile && (
        <section className="section-sm">
          <div className="container">
            <SectionHeader eyebrow={lang === "zh" ? "速查表" : "QUICK CHART"} title={c.matchTitle} num="03" />
            <p style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 14, marginBottom: 24 }}>{c.matchSub}</p>
            <MatchMatrix c={c} mobile={mobile} />
          </div>
        </section>
      )}

      {/* Three lines */}
      <section className="section-sm" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader eyebrow={lang === "zh" ? "计费解释" : "BILLING"} title={c.explainTitle} num={mobile ? "03" : "04"} />
          <div style={{
            marginTop: 28, display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
            gap: 14,
          }}>
            {c.explainLines.map((l, i) => (
              <div key={i} className="card-dark" style={{ padding: 22 }}>
                <div className="t-mono" style={{ fontSize: 11, color: "var(--brand)", letterSpacing: ".25em", fontWeight: 800 }}>STEP {l.tag}</div>
                <div style={{ marginTop: 10, fontSize: 18, fontWeight: 800, letterSpacing: "-.01em" }}>{l.t}</div>
                <div style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6 }}>{l.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="section-sm">
        <div className="container">
          <SectionHeader eyebrow={lang === "zh" ? "常问几句" : "QUICK FAQ"} title={c.faqTitle} num={mobile ? "04" : "05"} />
          {mobile ? (
            <FaqAccordion items={c.faq} />
          ) : (
            <div style={{
              marginTop: 24, display: "grid",
              gridTemplateColumns: "1fr 1fr", gap: 14,
            }}>
              {c.faq.map((f, i) => (
                <div key={i} style={{ padding: "16px 18px", borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--line)" }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>{f.q}</div>
                  <div style={{ color: "var(--ink-2)", marginTop: 6, fontSize: 13.5, lineHeight: 1.6 }}>{f.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-sm">
        <div className="container">
          <div style={{
            padding: mobile ? "28px 22px" : "44px 48px",
            borderRadius: 18,
            background: "linear-gradient(135deg, rgba(181,140,255,.08), rgba(255,93,168,.04))",
            border: "1px solid #B58CFF",
            display: "flex", flexDirection: mobile ? "column" : "row",
            alignItems: mobile ? "flex-start" : "center", justifyContent: "space-between",
            gap: 22,
          }}>
            <div>
              <div style={{ fontSize: mobile ? 24 : 30, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.2 }}>{c.ctaTitle}</div>
              <div style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 14.5 }}>{c.ctaSub}</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => go("employees")}>{c.ctaHire}</button>
              <button className="btn btn-ghost" onClick={() => go("about")}>{c.ctaTalk}</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

window.PricingPage = PricingPageNew;
