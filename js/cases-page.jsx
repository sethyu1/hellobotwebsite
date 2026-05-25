// HelloBot · Use Cases page redesign
// "首批 4 个经理型 Agent — 先切管理者的高频系统工作"
// Outcome-first. Each agent is presented as an ongoing system, not a one-shot tool.

const { useState: useStateUC, useEffect: useEffectUC } = React;

// ====== Bilingual content ======
const UC_C = {
  zh: {
    eyebrow: "使用场景 · 首批 Agent",
    title: "先从你每周都做不完的工作开始",
    titleHl: "每周都做不完",
    sub: "会议、待办、内容、调研、增长复盘——这些不是偶尔发生的任务，而是小团队每天都在处理的工作。\nHelloBot 把它们变成 4 个可以长期雇佣的 AI 员工",

    pillarTitle: "选岗逻辑",
    pillars: [
      { i: "👔", t: "管理者高频", d: "他们每周都要做，永远做不完。" },
      { i: "♻︎", t: "系统化工作", d: "不是一次性产物，是要持续更新的系统。" },
      { i: "📦", t: "结果可交付", d: "每一项产出都是一份可下载、可同步、可审阅的具体物件。" },
    ],

    spotlightTag: "核心入口 · 执行总控",
    spotlightHeadline: "总经理秘书",
    spotlightSub: "老板与管理层的执行系统总控台",
    spotlightDesc: "不是记一次会议，而是把老板和管理层的执行系统长期管起来——会议纪要自动归档、行动项持续追踪、周报自动汇总、日程与提醒实时同步。",
    spotlightDeliveries: ["会议纪要归档", "行动项追踪", "周报自动汇总", "日程管理", "待办提醒", "决策记录"],
    spotlightCtaSee: "看演示",
    spotlightCtaHire: "雇佣秘书 →",

    dividerLeft: "统筹调度",
    dividerMid: "·",
    dividerRight: "专业分工",

    coManagersTitle: "三个专业经理",
    coManagersSub: "和秘书并行运转，把内容、研究、增长的高频工作系统化",

    moreTitle: "MORE INCOMING",
    moreSub: "下一批正在面试中——",
    moreSlots: [
      { tag: "PD", role: "产品设计经理", note: "设计系统 / 走查 / 评审记录" },
      { tag: "OP", role: "运营负责人", note: "活动节奏 / SOP / 数据看板" },
      { tag: "HR", role: "招聘协调员", note: "JD / 简历筛 / 面试包" },
      { tag: "CS", role: "客服主管", note: "客诉归档 / SLA 周报 / 改进项" },
      { tag: "FN", role: "财务助理", note: "对账 / 报销 / 月度复盘" },
      { tag: "BD", role: "商务拓展", note: "线索池 / 跟进节奏 / 合作进展" },
    ],

    closingPunchPre: "首批先做一支",
    closingPunchHl: "可协作的 AI 管理团队",
    closingPunchMid: "；接下来，我们会像真正的招聘市场一样，持续上线",
    closingPunchHl2: "更多岗位、场景和专业能力",
    closingPunchPost: "。",

    // Three managers
    managers: [
      {
        key: "C", initial: "C", color: "#FF5DA8", tagBg: "rgba(255,93,168,.16)",
        title: "内容策略经理",
        oneLine: "把内容工作变成长期持续运转的系统",
        desc: "不是临时写一条文案，而是持续维护内容日历、选题池和品牌语气。",
        deliverables: ["内容日历", "选题池", "品牌语气", "多平台版本"],
        inputs: ["品牌资料 · 历史爆款 · 客户案例"],
        outputs: ["每月内容日历 .xlsx", "选题池 .md", "品牌 voice 指南 .docx", "多平台版本 .zip"],
        cadence: "每周一周更选题池、每周五出周内容回顾",
        sampleOutput: { kind: "calendar", label: "MAY · 内容日历" },
      },
      {
        key: "R", initial: "R", color: "#B58CFF", tagBg: "rgba(181,140,255,.16)",
        title: "市场研究经理",
        oneLine: "把市场与竞品研究变成持续更新的研究系统",
        desc: "不是临时分析一张截图，而是长期维护竞品数据库和研究报告。",
        deliverables: ["竞品对标", "价格变化", "卖点收集", "研究周报"],
        inputs: ["关注的竞品列表 · 你的定位 · 行业关键词"],
        outputs: ["竞品对标矩阵 .xlsx", "价格变动追踪 .csv", "研究周报 .pdf", "卖点对照 .docx"],
        cadence: "每周一晨会研究周报、竞品有变化即时同步",
        sampleOutput: { kind: "matrix", label: "竞品对标 · W47" },
      },
      {
        key: "G", initial: "G", color: "#2DD4BF", tagBg: "rgba(45,212,191,.16)",
        title: "增长运营经理",
        oneLine: "把增长工作变成持续迭代的实验系统",
        desc: "不是临时看一份报表，而是长期维护实验假设库和复盘文档。",
        deliverables: ["测试计划", "实验记录", "复盘文档", "Winning Angle"],
        inputs: ["增长目标 · 历史数据 · 渠道列表"],
        outputs: ["实验日历 .xlsx", "实验记录库 .md", "复盘文档 .docx", "Winning Angle 周报 .pdf"],
        cadence: "每两周一次实验复盘、Winning Angle 即时归档",
        sampleOutput: { kind: "experiment", label: "EXP-A47 · 复盘" },
      },
    ],
  },
  en: {
    eyebrow: "Use Cases · First-Batch Agents",
    title: "Start with the work you can't finish each week",
    titleHl: "can't finish each week",
    sub: "Meetings, to-dos, content, research, growth retros — these aren't occasional tasks. They're the daily backlog of any small team.\nHelloBot turns them into 4 AI employees you can keep on payroll long-term",

    pillarTitle: "Why these four",
    pillars: [
      { i: "👔", t: "Manager-frequency", d: "Things you do every week and never get to the bottom of." },
      { i: "♻︎", t: "System-shaped", d: "Not one-shot deliverables — systems that need to keep updating." },
      { i: "📦", t: "Output you can hold", d: "Every result is a real file, calendar event, or report you can download and review." },
    ],

    spotlightTag: "Core Role · Execution Hub",
    spotlightHeadline: "Chief of Staff",
    spotlightSub: "Your executive team's long-running operating system",
    spotlightDesc: "Not just minute-taking — she runs the whole execution loop: archiving meeting notes, tracking action items, drafting weekly reports, and syncing schedules and reminders in real time.",
    spotlightDeliveries: ["Meeting Archive", "Action Tracking", "Weekly Reports", "Calendar Sync", "Reminders", "Decision Log"],
    spotlightCtaSee: "See demo",
    spotlightCtaHire: "Hire her →",

    dividerLeft: "Orchestration",
    dividerMid: "·",
    dividerRight: "Specialists",

    coManagersTitle: "Three specialist managers",
    coManagersSub: "They run alongside the Chief of Staff, systematizing content, research, and growth ops",

    moreTitle: "MORE INCOMING",
    moreSub: "Next batch — currently interviewing:",
    moreSlots: [
      { tag: "PD", role: "Design Lead", note: "Design system · reviews · approvals" },
      { tag: "OP", role: "Head of Ops", note: "Cadence · SOPs · dashboards" },
      { tag: "HR", role: "Talent Coordinator", note: "JDs · screening · interview kits" },
      { tag: "CS", role: "Support Lead", note: "Tickets · SLA reports · fixes" },
      { tag: "FN", role: "Finance Assistant", note: "Reconciliation · expenses · MRR review" },
      { tag: "BD", role: "BD Manager", note: "Pipeline · follow-up cadence · deal logs" },
    ],

    closingPunchPre: "We started with a ",
    closingPunchHl: "coordinated AI management team",
    closingPunchMid: ". From here — like a real talent marketplace — we'll keep adding ",
    closingPunchHl2: "more roles, scenarios, and specialist skills",
    closingPunchPost: ".",

    managers: [
      {
        key: "C", initial: "C", color: "#FF5DA8", tagBg: "rgba(255,93,168,.16)",
        title: "Content Strategy Manager",
        oneLine: "Turns content work into a system that keeps running",
        desc: "Not just one-off copy — she maintains your content calendar, idea backlog, and brand voice.",
        deliverables: ["Content Calendar", "Idea Backlog", "Brand Voice", "Cross-platform Versions"],
        inputs: ["Brand kit · past hits · customer stories"],
        outputs: ["Monthly calendar .xlsx", "Idea backlog .md", "Voice guide .docx", "Multi-platform pack .zip"],
        cadence: "Weekly idea refresh on Mon · weekly recap on Fri",
        sampleOutput: { kind: "calendar", label: "MAY · Content Calendar" },
      },
      {
        key: "R", initial: "R", color: "#B58CFF", tagBg: "rgba(181,140,255,.16)",
        title: "Market Research Manager",
        oneLine: "Turns research into a database that stays current",
        desc: "Not screenshot analysis — she maintains a long-running competitive database and weekly research reports.",
        deliverables: ["Competitor Map", "Price Tracking", "Positioning Library", "Weekly Research"],
        inputs: ["Competitor list · your positioning · category keywords"],
        outputs: ["Competitor matrix .xlsx", "Price tracker .csv", "Weekly report .pdf", "Positioning doc .docx"],
        cadence: "Weekly Mon report · live updates when competitors move",
        sampleOutput: { kind: "matrix", label: "Competitive · W47" },
      },
      {
        key: "G", initial: "G", color: "#2DD4BF", tagBg: "rgba(45,212,191,.16)",
        title: "Growth Operations Manager",
        oneLine: "Turns growth work into a continuous experimentation system",
        desc: "Not just looking at a dashboard — she keeps your hypothesis backlog and post-mortems organized.",
        deliverables: ["Test Plan", "Experiment Log", "Post-mortems", "Winning Angles"],
        inputs: ["Growth targets · historical data · channel list"],
        outputs: ["Experiment calendar .xlsx", "Experiment log .md", "Post-mortems .docx", "Winning Angles brief .pdf"],
        cadence: "Bi-weekly post-mortem · Winning Angles archived live",
        sampleOutput: { kind: "experiment", label: "EXP-A47 · Post-mortem" },
      },
    ],
  },
};

// ====== Sample output mini-mocks (dynamic visuals per agent) ======
function MiniCalendar({ accent, label }) {
  const cells = [
    [null, null, "p", null, "i", "p", null],
    ["v", null, null, "p", null, "i", "v"],
    [null, "p", "i", null, "v", null, null],
    ["i", null, null, "v", "p", null, "p"],
  ];
  return (
    <div style={{
      borderRadius: 10, background: "rgba(255,255,255,.04)",
      border: "1px solid var(--line)", overflow: "hidden",
    }}>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="t-mono" style={{ fontSize: 10, color: accent, letterSpacing: ".2em", fontWeight: 700 }}>{label}</span>
        <span className="t-mono" style={{ fontSize: 9, color: "var(--ink-3)" }}>4w · 28 posts</span>
      </div>
      <div style={{ padding: 8, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {cells.flat().map((c, i) => (
          <div key={i} style={{
            aspectRatio: "1", borderRadius: 4,
            background: c ? accent : "rgba(255,255,255,.05)",
            opacity: c === "p" ? 1 : c === "i" ? .55 : c === "v" ? .8 : .35,
            display: "grid", placeItems: "center",
            fontFamily: "var(--font-mono)", fontSize: 7, color: "rgba(0,0,0,.7)", fontWeight: 700,
          }}>{c?.toUpperCase()}</div>
        ))}
      </div>
      <div style={{ padding: "6px 12px", borderTop: "1px dashed var(--line)", display: "flex", gap: 10, fontSize: 9, color: "var(--ink-3)", fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>
        <span>● P · 推文</span><span style={{ opacity: .7 }}>● I · 长图</span><span style={{ opacity: .55 }}>● V · 视频</span>
      </div>
    </div>
  );
}

function MiniMatrix({ accent, label }) {
  const rows = [
    ["Acme", "▲", "$98", "Strong", "Active"],
    ["Beta", "▼", "$42", "Mid", "Active"],
    ["Coil", "—", "$120", "Weak", "Quiet"],
    ["Drift", "▲", "$58", "Strong", "Launch"],
  ];
  return (
    <div style={{
      borderRadius: 10, background: "rgba(255,255,255,.04)",
      border: "1px solid var(--line)", overflow: "hidden",
    }}>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="t-mono" style={{ fontSize: 10, color: accent, letterSpacing: ".2em", fontWeight: 700 }}>{label}</span>
        <span className="t-mono" style={{ fontSize: 9, color: "var(--ink-3)" }}>14 competitors</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr .6fr .8fr 1fr .9fr" }}>
        {["NAME", "△", "PRICE", "POS.", "STATE"].map((h, i) => (
          <div key={i} className="t-mono" style={{
            padding: "6px 10px", fontSize: 9, color: "var(--ink-3)", letterSpacing: ".15em", fontWeight: 700,
            borderBottom: "1px solid var(--line)",
            borderRight: i < 4 ? "1px solid var(--line-soft)" : "none",
          }}>{h}</div>
        ))}
        {rows.map((row, ri) => row.map((cell, ci) => (
          <div key={`${ri}-${ci}`} style={{
            padding: "6px 10px", fontSize: 10.5, color: "var(--ink-1)",
            borderBottom: ri < rows.length - 1 ? "1px solid var(--line-soft)" : "none",
            borderRight: ci < 4 ? "1px solid var(--line-soft)" : "none",
            fontFamily: ci === 0 ? "var(--font-sans)" : "var(--font-mono)",
            fontWeight: ci === 0 ? 600 : 400,
            color: ci === 1 && cell === "▲" ? "var(--ok)" : ci === 1 && cell === "▼" ? "var(--bad)" : "var(--ink-1)",
          }}>{cell}</div>
        )))}
      </div>
    </div>
  );
}

function MiniExperiment({ accent, label }) {
  const exps = [
    { id: "A47", name: "Onboarding step ↓", lift: "+8.2%", win: true },
    { id: "A46", name: "Pricing card order", lift: "−1.1%", win: false },
    { id: "A45", name: "CTA copy variant", lift: "+12.4%", win: true, hot: true },
  ];
  return (
    <div style={{
      borderRadius: 10, background: "rgba(255,255,255,.04)",
      border: "1px solid var(--line)", overflow: "hidden",
    }}>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="t-mono" style={{ fontSize: 10, color: accent, letterSpacing: ".2em", fontWeight: 700 }}>{label}</span>
        <span className="t-mono" style={{ fontSize: 9, color: "var(--ink-3)" }}>14 experiments · 6 winners</span>
      </div>
      {exps.map((e, i) => (
        <div key={i} style={{
          padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
          borderBottom: i < exps.length - 1 ? "1px dashed var(--line-soft)" : "none",
          background: e.hot ? "rgba(45,212,191,.05)" : "transparent",
        }}>
          <span className="t-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".1em" }}>{e.id}</span>
          <span style={{ fontSize: 11.5, color: "var(--ink-0)", flex: 1, minWidth: 0 }}>{e.name}</span>
          <span className="t-mono" style={{
            fontSize: 11, color: e.win ? "var(--ok)" : "var(--bad)", fontWeight: 700,
            padding: "2px 6px", borderRadius: 3,
            background: e.win ? "rgba(59,203,122,.1)" : "rgba(255,92,92,.08)",
          }}>{e.lift}</span>
          {e.hot && <span className="t-mono" style={{
            fontSize: 8.5, padding: "2px 5px", letterSpacing: ".15em", fontWeight: 800,
            background: accent, color: "#000",
          }}>WIN</span>}
        </div>
      ))}
    </div>
  );
}

function SampleOutput({ kind, accent, label }) {
  if (kind === "calendar") return <MiniCalendar accent={accent} label={label} />;
  if (kind === "matrix") return <MiniMatrix accent={accent} label={label} />;
  if (kind === "experiment") return <MiniExperiment accent={accent} label={label} />;
  return null;
}

// ====== Pieces ======
function PillarStrip({ c, mobile }) {
  return (
    <div style={{
      marginTop: 28, display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 0,
      border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden",
    }}>
      {c.pillars.map((p, i) => (
        <div key={i} style={{
          padding: "20px 22px",
          borderRight: !mobile && i < 2 ? "1px solid var(--line)" : "none",
          borderBottom: mobile && i < 2 ? "1px solid var(--line)" : "none",
          background: "var(--bg-2)",
        }}>
          <div style={{ fontSize: 24 }}>{p.i}</div>
          <div className="t-mono" style={{ marginTop: 10, fontSize: 11, letterSpacing: ".15em", color: "var(--brand)", textTransform: "uppercase" }}>0{i+1}</div>
          <div style={{ marginTop: 4, fontWeight: 700, fontSize: 17 }}>{p.t}</div>
          <div style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 13.5, lineHeight: 1.55 }}>{p.d}</div>
        </div>
      ))}
    </div>
  );
}

function SpotlightSlab({ c, mobile }) {
  const { go } = useRouter();
  return (
    <div style={{
      marginTop: 16, borderRadius: 16,
      background: "linear-gradient(180deg, #0E1530 0%, #0A0F22 100%)",
      border: "1px solid var(--line)",
      padding: mobile ? "26px 22px" : "40px 44px",
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "1.1fr 1fr",
      gap: mobile ? 24 : 56,
      alignItems: "start",
      position: "relative", overflow: "hidden",
    }}>
      <div>
        <span style={{
          display: "inline-block", padding: "5px 12px", borderRadius: 999,
          background: "rgba(255,138,61,.14)", color: "var(--brand)",
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".15em",
          textTransform: "uppercase", border: "1px solid rgba(255,138,61,.35)",
        }}>● {c.spotlightTag}</span>
        <h3 style={{
          marginTop: 16, fontSize: mobile ? 38 : 52, fontWeight: 800,
          letterSpacing: "-.02em", lineHeight: 1.05,
        }}>{c.spotlightHeadline}</h3>
        <div style={{
          marginTop: 10, color: "var(--brand)", fontWeight: 700,
          fontSize: mobile ? 16 : 18,
        }}>{c.spotlightSub}</div>
        <p style={{
          marginTop: 16, color: "var(--ink-1)", fontSize: 15,
          lineHeight: 1.7, maxWidth: 520,
        }}>{c.spotlightDesc}</p>
        <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-primary btn-sm" onClick={() => go("product")}>{c.spotlightCtaSee}</button>
          <button className="btn btn-ghost btn-sm" onClick={() => go("employees")}>{c.spotlightCtaHire}</button>
        </div>
      </div>
      <div>
        <div className="t-mono" style={{
          fontSize: 11, color: "var(--ink-3)", letterSpacing: ".18em", textTransform: "uppercase",
        }}>{UC_C.zh.spotlightHeadline === c.spotlightHeadline ? "核心交付" : "Core Deliveries"}</div>
        <div style={{
          marginTop: 16, display: "grid",
          gridTemplateColumns: "1fr 1fr", rowGap: 12, columnGap: 24,
        }}>
          {c.spotlightDeliveries.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: "var(--ink-0)" }}>
              <span style={{ color: "var(--brand)", fontSize: 12 }}>◆</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Divider({ c }) {
  return (
    <div style={{
      margin: "36px 0 24px", display: "flex", alignItems: "center", gap: 18,
      color: "var(--ink-3)",
    }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, var(--line))" }} />
      <span className="t-mono" style={{ fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase" }}>
        {c.dividerLeft} {c.dividerMid} {c.dividerRight}
      </span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--line), transparent)" }} />
    </div>
  );
}

function ManagerCard({ m, lang, mobile }) {
  return (
    <div style={{
      padding: mobile ? 22 : 26, borderRadius: 16,
      background: "var(--bg-2)", border: "1px solid var(--line)",
      display: "flex", flexDirection: "column", gap: 14,
      position: "relative", overflow: "hidden",
    }}>
      {/* Color bar accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.color,
      }} />
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          width: 36, height: 36, borderRadius: 9, background: m.tagBg,
          display: "grid", placeItems: "center", color: m.color, fontWeight: 800,
          fontSize: 18, fontFamily: "var(--font-mono)",
          border: `1px solid ${m.color}40`,
        }}>{m.initial}</span>
        <div>
          <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-.01em" }}>{m.title}</div>
          <div className="t-mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".1em", marginTop: 2 }}>
            {m.cadence}
          </div>
        </div>
      </div>

      {/* One-liner */}
      <div style={{
        padding: "12px 14px", borderRadius: 10,
        background: `linear-gradient(135deg, ${m.color}10, transparent)`,
        border: `1px solid ${m.color}30`,
        fontSize: 14.5, fontWeight: 600, lineHeight: 1.45, color: "var(--ink-0)",
      }}>
        {m.oneLine}
      </div>

      {/* Description */}
      <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
        {m.desc}
      </p>

      {/* Deliverable tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {m.deliverables.map((d, i) => (
          <span key={i} className="t-mono" style={{
            padding: "4px 10px", borderRadius: 999, fontSize: 11, letterSpacing: ".06em",
            background: m.tagBg, color: m.color, border: `1px solid ${m.color}40`,
          }}>{d}</span>
        ))}
      </div>

      {/* Mobile stops here. Desktop continues with Input→Output + mini mock. */}
      {!mobile && (
        <>
          <div style={{
            marginTop: 4, padding: "12px 14px", borderRadius: 10,
            background: "rgba(0,0,0,.18)", border: "1px dashed var(--line)",
          }}>
            <div className="t-mono" style={{ fontSize: 9.5, color: "var(--ink-3)", letterSpacing: ".18em", marginBottom: 6 }}>
              {lang === "zh" ? "你给的 INPUT" : "YOU GIVE"}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-1)", lineHeight: 1.5 }}>{m.inputs[0]}</div>
            <div style={{
              margin: "10px -14px", height: 1,
              background: `repeating-linear-gradient(90deg, ${m.color}80 0 8px, transparent 8px 14px)`,
            }} />
            <div className="t-mono" style={{ fontSize: 9.5, color: m.color, letterSpacing: ".18em", marginBottom: 6, fontWeight: 700 }}>
              {lang === "zh" ? "她交付 OUTPUT" : "SHE DELIVERS"}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {m.outputs.map((o, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-0)" }}>
                  <span style={{ color: m.color, fontFamily: "var(--font-mono)", fontSize: 10 }}>↳</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <SampleOutput kind={m.sampleOutput.kind} accent={m.color} label={m.sampleOutput.label} />
        </>
      )}
    </div>
  );
}

function MoreIncoming({ c, mobile }) {
  return (
    <section className="section-sm" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
          <span className="t-mono" style={{
            fontSize: 12, color: "var(--brand)", letterSpacing: ".25em", fontWeight: 700,
            padding: "4px 10px", border: "1px solid var(--brand)", borderRadius: 4,
          }}>● {c.moreTitle}</span>
          <span style={{ color: "var(--ink-2)", fontSize: 14.5 }}>{c.moreSub}</span>
        </div>
        <div style={{
          marginTop: 24, display: "grid",
          gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)",
          gap: 10,
        }}>
          {c.moreSlots.map((s, i) => (
            <div key={i} style={{
              padding: 16, borderRadius: 12,
              background: "var(--bg-1)", border: "1px dashed var(--line)",
              opacity: 0.65,
              transition: "opacity .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.65"}
            >
              <div className="t-mono" style={{
                width: 28, height: 28, borderRadius: 7,
                background: "var(--bg-3)", border: "1px solid var(--line)",
                display: "grid", placeItems: "center", color: "var(--ink-3)",
                fontSize: 11, fontWeight: 800, letterSpacing: ".05em",
              }}>{s.tag}</div>
              <div style={{ marginTop: 12, fontWeight: 700, fontSize: 14, color: "var(--ink-1)" }}>{s.role}</div>
              <div style={{ marginTop: 4, fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.45 }}>{s.note}</div>
              <div className="t-mono" style={{
                marginTop: 10, fontSize: 9, color: "var(--ink-3)", letterSpacing: ".18em",
              }}>● 招聘中 / HIRING</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingPunch({ c, mobile }) {
  return (
    <section className="section-sm">
      <div className="container">
        <div style={{
          padding: mobile ? "24px 22px" : "32px 36px",
          borderRadius: 14,
          background: "linear-gradient(135deg, rgba(255,138,61,.08), rgba(255,138,61,.02))",
          border: "1px dashed var(--brand)",
          display: "flex", alignItems: "flex-start", gap: 14,
        }}>
          <span style={{ fontSize: 20, color: "var(--brand)", lineHeight: 1 }}>◆</span>
          <p style={{ margin: 0, fontSize: mobile ? 15 : 17.5, lineHeight: 1.65, color: "var(--ink-0)" }}>
            {c.closingPunchPre}
            <strong style={{ color: "var(--brand)" }}>{c.closingPunchHl}</strong>
            {c.closingPunchMid}
            <strong style={{ color: "var(--brand)" }}>{c.closingPunchHl2}</strong>
            {c.closingPunchPost}
          </p>
        </div>
      </div>
    </section>
  );
}

// ====== MAIN PAGE ======
function CasesPageNew() {
  const { lang } = useI18n();
  const { mobile } = useRouter();
  const c = UC_C[lang] || UC_C.en;

  return (
    <main>
      {/* Hero */}
      <section style={{
        padding: mobile ? "32px 0 24px" : "60px 0 36px",
        borderBottom: "1px dashed var(--line)",
      }}>
        <div className="container">
          <Stamp>{c.eyebrow}</Stamp>
          <h1 className="h-display" style={{
            marginTop: 16, fontSize: mobile ? 36 : 56, lineHeight: 1.1, letterSpacing: "-.02em",
          }}>
            {(() => {
              const idx = c.titleHl ? c.title.indexOf(c.titleHl) : -1;
              if (idx < 0) return c.title;
              return (
                <>
                  {c.title.slice(0, idx)}
                  <span style={{ color: "var(--brand)" }}>{c.titleHl}</span>
                  {c.title.slice(idx + c.titleHl.length)}
                </>
              );
            })()}
          </h1>
          <p style={{
            marginTop: 18, color: "var(--ink-1)", fontSize: mobile ? 15 : 17.5,
            lineHeight: 1.7, maxWidth: 760, whiteSpace: "pre-line", textWrap: "pretty",
          }}>{c.sub}</p>
        </div>
      </section>

      {/* Pillar strip */}
      <section className="section-sm">
        <div className="container">
          <SectionHeader eyebrow={c.pillarTitle} title={lang === "zh" ? "为什么先做这 4 个？" : "Why these four first?"} num="01" />
          <PillarStrip c={c} mobile={mobile} />
        </div>
      </section>

      {/* Spotlight + Co-managers */}
      <section className="section-sm" style={{ background: "var(--bg-2)" }}>
        <div className="container">
          <SectionHeader
            eyebrow={lang === "zh" ? "首批 Agent 团队" : "First-Batch Team"}
            title={lang === "zh" ? "1 位执行总控 + 3 位专业经理" : "One Chief of Staff + three specialist managers"}
            num="02"
          />
          {/* Spotlight slab */}
          <SpotlightSlab c={c} mobile={mobile} />
          {/* Divider */}
          <Divider c={c} />
          {/* Three co-managers */}
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{c.coManagersTitle}</h3>
            <p style={{ marginTop: 6, color: "var(--ink-2)", fontSize: 14 }}>{c.coManagersSub}</p>
          </div>
          <div style={{
            marginTop: 18, display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 14,
          }}>
            {c.managers.map(m => <ManagerCard key={m.key} m={m} lang={lang} mobile={mobile} />)}
          </div>
        </div>
      </section>

      {/* MORE INCOMING */}
      <MoreIncoming c={c} mobile={mobile} />

      {/* Closing punch */}
      <ClosingPunch c={c} mobile={mobile} />
    </main>
  );
}

window.CasesPage = CasesPageNew;
