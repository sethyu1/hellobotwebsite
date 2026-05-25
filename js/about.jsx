// HelloBot · About page — themed as the company's own personnel file.
// Sections: Cover slab → Mission → Origin (case file) → Manifesto (We believe / We don't)
// → Team (ID-card style) → Office stats → Founder letter → Careers → Contact.

const { useState: useStateA, useEffect: useEffectA } = React;

// ============ Inline content (bilingual) ============
const ABOUT_CONTENT = {
  zh: {
    fileNumber: "FILE · HB-001",
    fileLabel: "公司档案",
    title1: "HelloBot Inc.",
    title2: "不是在用 AI，是在当老板",
    statusBadge: "运营中 · 第 1 个财年",
    foundedLabel: "成立",
    foundedValue: "2025 冬",
    sizeLabel: "团队规模",
    sizeValue: "6 人 + 15 位 AI 员工",
    hqLabel: "总部",
    hqValue: "深圳 · 南山",

    missionTitle: "公司使命",
    missionBig: "让 AI 不再是一个聊天框，而是一群你认识的同事",
    missionSub: "我们相信，「招聘、付薪、共事」是人理解 AI 最自然的方式。我们也认为，AI 不应该是一个冷冰冰的工具——它应该有名字、有性格、有情绪、会摸鱼",

    caseTitle: "案件 · HB-001",
    caseSub: "为什么我们要做 HelloBot",
    caseChapters: [
      { tag: "现场", t: "现状一团糟。", d: "用户对着空白聊天框不知道说什么。模型再强，也只是一个无脸的工具。我们想要的不是更强的模型，是一个真正会回我消息的「同事」。" },
      { tag: "动机", t: "Token 经济学不是关系。", d: "按 token 付费、按消息计价，让人和 AI 之间始终是「按次买东西」的关系。但人和人之间的关系，是雇佣、是共事、是工资条上的那一栏。" },
      { tag: "决定", t: "把产品做成职场。", d: "于是我们决定：不做工具栏，做人才市场。不做 chat box，做工作台。不做 token 计费，做周薪制。" },
    ],

    manifestoTitle: "我们的信条",
    believe: [
      "AI 应该有名字、有性格、有情绪。",
      "「关系」比「调用」更接近真实使用方式。",
      "工资条比 token 计费更让人安心。",
      "摸鱼是一种人性，不是一种 bug。",
      "好玩是底线，不是奖励。",
    ],
    dontBelieve: [
      "没有人格的 AI 工具。",
      "一次性调用、用完即走。",
      "把 token 成本暴露给用户。",
      "把 AI 员工做成完美机器。",
      "把生产力产品做得无聊。",
    ],

    teamTitle: "核心团队",
    teamSub: "我们也是一群有名字、有性格、偶尔摸鱼的人类员工",
    team: [
      { id: "FOUND-01",  emoji: "🧑‍💼", color: "#FF8A3D", name: "黄际宇 / Jerry Huang", role: "Founder · CEO & Product Lead",         tag: "产品 Owner",  bio: "提出 HelloBot「AI 员工招聘市场」方向，把技术能力转化为产品、用户、收入和融资结果。" },
      { id: "INFRA-01",  emoji: "🛠️",  color: "#4DA3FF", name: "Dr. 赵",              role: "Systems / Infrastructure Lead",        tag: "系统底座",     bio: "让多 Agent 系统跑得稳、调得动、扛得住。" },
      { id: "AGENT-01",  emoji: "🧭",   color: "#B58CFF", name: "刘青松",              role: "Agent Orchestration / Decision Lead",  tag: "调度决策",     bio: "把一句目标拆成任务、角色、顺序和回退机制。" },
      { id: "DEPLOY-01", emoji: "🚀",   color: "#3BCB7A", name: "方少可",              role: "Agent Productization / Deployment Lead", tag: "Agent 落地", bio: "把模型、知识和工作流装进真实场景里，真正交付结果。" },
    ],

    statsTitle: "今日办公室仪表盘",
    statsSub: "这是个真实数字，这也是个梗",
    stats: [
      { v: "6", l: "人类员工" },
      { v: "15", l: "AI 员工" },
      { v: "6", l: "今日新入职" },
      { v: "18%", l: "全员摸鱼指数" },
      { v: "$5M", l: "种子轮估值" },
      { v: "4.9★", l: "员工评价（自评）" },
    ],

    letterTitle: "创始人手记",
    letterDate: "2025.11 · 写于一个加班到很晚的周二",
    letterBody: [
      "我做过太多让人失望的 AI 产品了。",
      "每次 demo 都很惊艳，每次真正用起来却很快失望。最大的问题不是模型不够强，而是它没有「关系」——你不知道它是谁，它也不在乎你是谁。",
      "于是我们决定换一个壳：把它做成一份工作。",
      "不是工具，是同事。\n不是调用，是雇佣。\n不是冷冰冰的 chat box，而是一个有名字、有性格、会交付、会摸鱼、也会被管理的 AI 员工。",
      "我们相信，AI 不应该逼普通人学习 Prompt、工作流和模型参数。AI 应该像一个员工一样，被分配目标、被追踪进度、被验收结果。",
      "如果你觉得这听起来既荒唐又合理——欢迎，你来对地方了。",
    ],
    letterSign: "Jerry Huang · 创始人",

    careersTitle: "我们也在招人（人类）",
    careersSub: "AI 员工很多，但有些事还得人来",
    careers: [
      { role: "全栈工程师", tag: "Engineering", note: "你将和 6 位人类、15 位 AI 同事共事。" },
      { role: "产品设计师", tag: "Design", note: "请准备好你对工卡和便利贴的执念。" },
      { role: "增长负责人", tag: "Growth", note: "你的 KPI 包括降低全员摸鱼指数。" },
      { role: "AI 训练师", tag: "Research", note: "你将培训我们的 AI 员工，让他们少摸点鱼。" },
    ],

    contactTitle: "联系方式",
    contactSub: "我们在等你的简历，或一封随便写写的邮件",
    contacts: [
      { t: "商务合作", d: "contact@rainzortech.com" },
      { t: "媒体合作", d: "press@rainzortech.com" },
      { t: "求职 / 咨询", d: "team@rainzortech.com" },
    ],
    socials: [
      { p: "微信公众号", h: "@HelloBot官方" },
      { p: "X / Twitter", h: "@hellobot_app" },
      { p: "小红书", h: "HelloBot 官号" },
    ],

    finalCta: "看够了我们的档案，要不要看看候选人？",
    finalCtaBtn: "去人才市场",
  },
  en: {
    fileNumber: "FILE · HB-001",
    fileLabel: "COMPANY FILE",
    title1: "HelloBot Inc.",
    title2: "You're not using AI. You're being the boss",
    statusBadge: "OPERATING · FY-01",
    foundedLabel: "Founded",
    foundedValue: "Winter 2025",
    sizeLabel: "Team",
    sizeValue: "6 humans + 15 AI hires",
    hqLabel: "HQ",
    hqValue: "Shenzhen · Nanshan",

    missionTitle: "Mission",
    missionBig: "Make AI feel less like a tool, and more like a team you actually run",
    missionSub: "We believe \"hire, pay, manage\" is the most natural way humans understand AI. We also believe AI shouldn't be a cold, faceless utility — it should have names, personalities, moods, and the right to occasionally loaf.",

    caseTitle: "Case File · HB-001",
    caseSub: "Why we built this thing",
    caseChapters: [
      { tag: "Scene", t: "The status quo is a mess.", d: "People stare at a blinking cursor in a chat box. The model gets stronger, but it's still a faceless utility. We didn't want a better model. We wanted a coworker who actually answers." },
      { tag: "Motive", t: "Token economics aren't a relationship.", d: "Pay-per-token, pay-per-message — every interaction is a transaction. But the way humans actually relate to other humans is hiring, working together, and showing up on a payslip." },
      { tag: "Verdict", t: "So we built an office.", d: "No more toolbars — a job board. No more chat box — a workbench. No more token meters — a weekly salary." },
    ],

    manifestoTitle: "What we believe",
    believe: [
      "AI deserves a name, a personality, and a mood.",
      "\"Relationship\" beats \"API call\" every time.",
      "A salary is more honest than a token meter.",
      "Loafing is a feature of being human, not a bug.",
      "Fun is the floor, not a bonus.",
    ],
    dontBelieve: [
      "Faceless AI tools.",
      "One-shot calls. Use it once, walk away.",
      "Exposing token costs to the user.",
      "Turning AI employees into flawless machines.",
      "Making productivity products boring.",
    ],

    teamTitle: "Core team",
    teamSub: "We're also a group of named, slightly moody, occasionally loafing humans",
    team: [
      { id: "FOUND-01",  emoji: "🧑‍💼", color: "#FF8A3D", name: "Jerry Huang",   role: "Founder · CEO & Product Lead",            tag: "Product Owner",        bio: "Defined HelloBot's \"AI employee marketplace\" direction. Turns engineering capability into product, users, revenue, and fundraising outcomes." },
      { id: "INFRA-01",  emoji: "🛠️",  color: "#4DA3FF", name: "Dr. Zhao",      role: "Systems / Infrastructure Lead",           tag: "Systems Backbone",     bio: "Keeps the multi-agent system stable, controllable, and battle-ready under load." },
      { id: "AGENT-01",  emoji: "🧭",   color: "#B58CFF", name: "Liu Qingsong",  role: "Agent Orchestration / Decision Lead",     tag: "Orchestration & Decisions", bio: "Breaks one-line goals into tasks, roles, sequences, and fallback paths." },
      { id: "DEPLOY-01", emoji: "🚀",   color: "#3BCB7A", name: "Fang Shaoke",   role: "Agent Productization / Deployment Lead",  tag: "Agent Delivery",       bio: "Packages models, knowledge, and workflows into real-world scenarios that actually ship." },
    ],

    statsTitle: "Today's office dashboard",
    statsSub: "Real number, also a joke",
    stats: [
      { v: "6", l: "Humans" },
      { v: "15", l: "AI hires" },
      { v: "6", l: "Hired today" },
      { v: "18%", l: "Loafing index" },
      { v: "$5M", l: "Seed valuation" },
      { v: "4.9★", l: "Employee rating (self-rated)" },
    ],

    letterTitle: "Note from the founder",
    letterDate: "Nov 2025 · written too late on a Tuesday",
    letterBody: [
      "I've shipped too many disappointing AI products.",
      "Every demo dazzles. Then real-world usage falls apart fast. The problem isn't that models are weak — it's that they have no \"relationship\" with you. You don't know who they are. They don't care who you are.",
      "So we changed the wrapper. We made it a job.",
      "Not a tool — a coworker.\nNot a call — a hire.\nNot a sterile chat box, but an AI employee with a name, a personality, who delivers, who occasionally loafs, and who can actually be managed.",
      "We believe AI shouldn't force normal people to learn prompt engineering, workflows, and model parameters. AI should behave like an employee — given goals, tracked on progress, signed off on results.",
      "If that sounds both ridiculous and obviously right — welcome. You're in the right office.",
    ],
    letterSign: "Jerry Huang · Founder",

    careersTitle: "We're also hiring (humans)",
    careersSub: "We have a lot of AI staff, but some things still need a person",
    careers: [
      { role: "Full-stack Engineer", tag: "Engineering", note: "You'll work with 6 humans and 15 AI coworkers." },
      { role: "Product Designer", tag: "Design", note: "Bring your obsessions about ID cards and sticky notes." },
      { role: "Head of Growth", tag: "Growth", note: "One of your KPIs is lowering the company-wide loafing index." },
      { role: "AI Trainer", tag: "Research", note: "You'll teach our AI employees to loaf slightly less." },
    ],

    contactTitle: "Get in touch",
    contactSub: "We're waiting for your résumé. Or just an email, no résumé required",
    contacts: [
      { t: "Business", d: "contact@rainzortech.com" },
      { t: "Press", d: "press@rainzortech.com" },
      { t: "Careers / Hello", d: "team@rainzortech.com" },
    ],
    socials: [
      { p: "WeChat Official", h: "@HelloBot官方" },
      { p: "X / Twitter", h: "@hellobot_app" },
      { p: "RedNote", h: "HelloBot Official" },
    ],

    finalCta: "Done browsing the file. Want to look at the actual candidates?",
    finalCtaBtn: "Visit the marketplace",
  },
};

// ============ Sub-components ============
function CoverSlab({ c, mobile, lang }) {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      padding: mobile ? "36px 0 28px" : "72px 0 56px",
      borderBottom: "1px dashed var(--line)",
      background: "var(--bg-1)",
    }}>
      {/* Faint grid backdrop */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: mobile ? 18 : 24 }}>
          <Stamp color="orange">{c.fileLabel}</Stamp>
          <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".15em" }}>{c.fileNumber}</span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 8px",
            border: "1px solid var(--brand)", color: "var(--brand)",
            borderRadius: 4, letterSpacing: ".1em",
          }}>{c.statusBadge}</span>
        </div>
        <h1 className="h-display" style={{ fontSize: mobile ? 38 : 72, lineHeight: 1, margin: 0, letterSpacing: "-.02em" }}>
          {c.title1}
        </h1>
        <p style={{ marginTop: 16, fontSize: mobile ? 18 : 26, lineHeight: 1.45, color: "var(--ink-1)", maxWidth: 760 }}>
          {c.title2}
        </p>

        {/* Quick facts strip */}
        <div style={{
          marginTop: mobile ? 24 : 36, display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(3, 1fr)",
          gap: 0, border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden",
        }}>
          {[
            [c.foundedLabel, c.foundedValue],
            [c.sizeLabel, c.sizeValue],
            [c.hqLabel, c.hqValue],
          ].map(([l, v], i) => (
            <div key={i} style={{
              padding: "14px 18px",
              borderRight: !mobile && i < 2 ? "1px solid var(--line)" : "none",
              borderBottom: mobile && i < 2 ? "1px solid var(--line)" : "none",
              background: "var(--bg-2)",
            }}>
              <div
                className={lang === "zh" ? undefined : "t-mono"}
                style={lang === "zh"
                  ? { fontSize: 13, color: "var(--ink-2)", letterSpacing: ".02em", fontWeight: 500 }
                  : { fontSize: 9.5, letterSpacing: ".18em", color: "var(--ink-3)", textTransform: "uppercase" }
                }
              >{l}</div>
              <div style={{ marginTop: 4, fontSize: 14, color: "var(--ink-0)", fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionBlock({ c, mobile }) {
  return (
    <section className="section-sm">
      <div className="container">
        <SectionHeader eyebrow={c.missionTitle} title={c.missionBig} num="01" />
        <p className="t-serif" style={{
          marginTop: 24, fontSize: mobile ? 17 : 21, lineHeight: 1.65,
          color: "var(--ink-1)", maxWidth: 820,
        }}>
          {c.missionSub}
        </p>
      </div>
    </section>
  );
}

function CaseFile({ c, mobile, lang }) {
  return (
    <section className="section-sm" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader eyebrow={c.caseTitle} title={c.caseSub} num="02" />
        <div style={{
          marginTop: 32, display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 14,
        }}>
          {c.caseChapters.map((ch, i) => (
            <div key={i} style={{
              padding: 22, background: "var(--bg-1)",
              border: "1px solid var(--line)", borderRadius: 10,
              position: "relative",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  className={lang === "zh" ? undefined : "t-mono"}
                  style={lang === "zh"
                    ? { fontSize: 13, color: "var(--brand)", letterSpacing: ".02em", fontWeight: 600 }
                    : { fontSize: 10, color: "var(--brand)", letterSpacing: ".18em", textTransform: "uppercase" }
                  }
                >{ch.tag}</span>
                <span className="t-mono" style={{ fontSize: 22, color: "var(--ink-3)", fontWeight: 700 }}>0{i + 1}</span>
              </div>
              <h4 style={{ marginTop: 10, fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>{ch.t}</h4>
              <p style={{ marginTop: 10, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.65 }}>{ch.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto({ c, mobile, lang }) {
  return (
    <section className="section-sm">
      <div className="container">
        <SectionHeader eyebrow={c.manifestoTitle} title={lang === "zh" ? "我们相信什么，我们拒绝什么" : "What we stand for. What we don't"} num="03" />
        <div style={{
          marginTop: 30, display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 14,
        }}>
          <div className="paper" style={{ padding: mobile ? 22 : 30, color: "var(--ink-paper)" }}>
            <div
              className={lang === "zh" ? undefined : "t-mono"}
              style={lang === "zh"
                ? { fontSize: 14, letterSpacing: ".02em", color: "var(--good)", fontWeight: 700 }
                : { fontSize: 10, letterSpacing: ".2em", color: "var(--good)", fontWeight: 700, textTransform: "uppercase" }
              }
            >
              {lang === "zh" ? "✓ 我们相信" : "✓ WE BELIEVE"}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
              {c.believe.map((b, i) => (
                <li key={i} style={{
                  display: "flex", gap: 10, fontSize: 15, lineHeight: 1.5,
                  paddingBottom: 12, borderBottom: i < c.believe.length - 1 ? "1px dashed var(--line-paper)" : "none",
                }}>
                  <span style={{ color: "var(--good)", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: 13 }}>+</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="paper" style={{ padding: mobile ? 22 : 30, color: "#fff", background: "rgba(214,76,76,.04)" }}>
            <div
              className={lang === "zh" ? undefined : "t-mono"}
              style={lang === "zh"
                ? { fontSize: 14, letterSpacing: ".02em", color: "var(--bad)", fontWeight: 700 }
                : { fontSize: 10, letterSpacing: ".2em", color: "var(--bad)", fontWeight: 700, textTransform: "uppercase" }
              }
            >
              {lang === "zh" ? "✗ 我们拒绝" : "✗ WE DON'T"}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
              {c.dontBelieve.map((b, i) => (
                <li key={i} style={{
                  display: "flex", gap: 10, fontSize: 15, lineHeight: 1.5,
                  paddingBottom: 12, borderBottom: i < c.dontBelieve.length - 1 ? "1px dashed var(--line)" : "none",
                  color: "#fff",
                }}>
                  <span style={{ color: "var(--bad)", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: 13 }}>—</span>
                  <span style={{
                    textDecoration: "line-through",
                    textDecorationColor: "var(--bad)",
                    textDecorationThickness: "2px",
                  }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCard({ p }) {
  return (
    <div className="paper" style={{ padding: 18, color: "var(--ink-paper)" }}>
      {/* Card header */}
      <div className="t-mono" style={{
        fontSize: 9, letterSpacing: ".22em", color: "var(--ink-paper-2)",
        display: "flex", justifyContent: "space-between", textTransform: "uppercase",
      }}>
        <span>EMPLOYEE · {p.id}</span>
        <span style={{ color: "var(--brand)" }}>● ACTIVE</span>
      </div>
      {/* Avatar */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12, background: p.color,
          display: "grid", placeItems: "center", fontSize: 30,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
        }}>{p.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
          <div className="t-mono" style={{ fontSize: 10, letterSpacing: ".12em", color: "var(--ink-paper-2)", textTransform: "uppercase", marginTop: 2 }}>
            {p.role}
          </div>
        </div>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10, padding: "3px 8px",
          background: "rgba(255,138,61,.15)", color: "var(--brand)",
          border: "1px solid rgba(255,138,61,.3)", borderRadius: 4,
          letterSpacing: ".05em",
        }}>{p.tag}</span>
      </div>
      <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.55, color: "var(--ink-paper)" }}>{p.bio}</p>
    </div>
  );
}

function Team({ c, mobile }) {
  return (
    <section className="section-sm" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader eyebrow={c.teamTitle} title={c.teamSub} num="04" />
        <div style={{
          marginTop: 30, display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 14,
        }}>
          {c.team.map(p => <TeamCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function StatsDashboard({ c, mobile, lang }) {
  return (
    <section className="section-sm">
      <div className="container">
        <SectionHeader eyebrow={c.statsTitle} title={c.statsSub} num="05" />
        <div style={{
          marginTop: 30, display: "grid",
          gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)",
          gap: 0, border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden",
        }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{
              padding: mobile ? "20px 16px" : "26px 20px",
              borderRight: !mobile && i < c.stats.length - 1 ? "1px solid var(--line)" : "none",
              borderBottom: mobile && i < c.stats.length - 2 ? "1px solid var(--line)" : "none",
              borderRight_mobile: mobile && i % 2 === 0 ? "1px solid var(--line)" : "none",
              background: i === 3 ? "rgba(214,76,76,.06)" : "var(--bg-2)",
              textAlign: "center", position: "relative",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontWeight: 800,
                fontSize: mobile ? 26 : 32, lineHeight: 1, color: i === 3 ? "var(--bad)" : "var(--brand)",
                letterSpacing: "-.02em",
              }}>{s.v}</div>
              <div
                className={lang === "zh" ? undefined : "t-mono"}
                style={lang === "zh"
                  ? { marginTop: 10, fontSize: 13, letterSpacing: ".02em", color: "var(--ink-1)", fontWeight: 500 }
                  : { marginTop: 8, fontSize: 10, letterSpacing: ".14em", color: "var(--ink-3)", textTransform: "uppercase" }
                }
              >{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderLetter({ c, mobile }) {
  return (
    <section className="section-sm">
      <div className="container" style={{ maxWidth: 760 }}>
        <SectionHeader eyebrow={c.letterTitle} title={c.letterDate} num="06" />
        <div className="card-dark" style={{
          marginTop: 24, padding: mobile ? 26 : 40, color: "#fff",
          transform: "rotate(-.4deg)",
        }}>
          <div className="t-mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            HANDWRITTEN MEMO
          </div>
          {c.letterBody.map((p, i) => (
            <p key={i} className="t-serif" style={{
              marginTop: i === 0 ? 22 : 22, marginBottom: 0,
              fontSize: mobile ? 16 : 18, lineHeight: 1.7,
              color: "#fff",
              whiteSpace: "pre-line",
            }}>
              {p}
            </p>
          ))}
          <div style={{
            marginTop: 22, paddingTop: 16, borderTop: "1px dashed var(--line)",
            fontFamily: "var(--font-serif, serif)", fontSize: 18, fontStyle: "italic",
            color: "#fff",
          }}>
            — {c.letterSign}
          </div>
        </div>
      </div>
    </section>
  );
}

function Careers({ c, mobile }) {
  return (
    <section className="section-sm" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader eyebrow={c.careersTitle} title={c.careersSub} num="07" />
        <div style={{
          marginTop: 28, display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: 12,
        }}>
          {c.careers.map((j, i) => (
            <a
              key={i}
              href={`mailto:team@rainzortech.com?subject=${encodeURIComponent("[Hello] " + j.role)}`}
              style={{ all: "unset", cursor: "pointer", display: "block" }}
            >
              <div className="card-dark lift" style={{
                padding: 22, display: "flex", justifyContent: "space-between",
                alignItems: "center", gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="t-mono" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--brand)", textTransform: "uppercase" }}>
                    {j.tag}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700 }}>{j.role}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>{j.note}</div>
                </div>
                <div style={{
                  fontSize: 22, color: "var(--brand)", flexShrink: 0,
                  fontFamily: "var(--font-mono)",
                }}>→</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBlock({ c, mobile, lang }) {
  return (
    <section id="contact" className="section-sm">
      <div className="container">
        <SectionHeader eyebrow={c.contactTitle} title={c.contactSub} num="08" />
        <div style={{
          marginTop: 28, display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: 14,
        }}>
          {c.contacts.map((it, i) => (
            <a key={i} href={`mailto:${it.d}`} style={{ all: "unset", cursor: "pointer" }}>
              <div className="card-dark lift" style={{ padding: 22, height: "100%", boxSizing: "border-box" }}>
                <div className="t-eyebrow" style={{ color: "var(--ink-3)" }}>{it.t}</div>
                <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--brand)", wordBreak: "break-all" }}>{it.d}</div>
              </div>
            </a>
          ))}
        </div>
        {/* Socials */}
        <div style={{
          marginTop: 18, padding: 16, border: "1px dashed var(--line)",
          borderRadius: 10, display: "flex", gap: 24, flexWrap: "wrap",
          alignItems: "center",
        }}>
          {c.socials.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                className={lang === "zh" ? undefined : "t-mono"}
                style={lang === "zh"
                  ? { fontSize: 13, color: "var(--ink-2)", letterSpacing: ".02em", fontWeight: 500 }
                  : { fontSize: 10, color: "var(--ink-3)", letterSpacing: ".15em", textTransform: "uppercase" }
                }
              >{s.p}</span>
              <span style={{ fontSize: 13, color: "var(--ink-1)", fontFamily: "var(--font-mono)" }}>{s.h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalAboutCta({ c, mobile }) {
  const { go } = useRouter();
  return (
    <section className="section-sm">
      <div className="container">
        <div style={{
          padding: mobile ? "30px 24px" : "44px 40px",
          background: "linear-gradient(135deg, rgba(255,138,61,.08), rgba(255,138,61,.02))",
          border: "1px dashed var(--brand)", borderRadius: 14,
          display: "flex", flexWrap: "wrap", gap: 18,
          alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ flex: "1 1 320px" }}>
            <div className="t-mono" style={{ fontSize: 11, letterSpacing: ".18em", color: "var(--brand)", textTransform: "uppercase" }}>
              END OF FILE
            </div>
            <h3 style={{ marginTop: 8, fontSize: mobile ? 22 : 28, fontWeight: 800, lineHeight: 1.3 }}>
              {c.finalCta}
            </h3>
          </div>
          <button onClick={() => go("employees")} className="btn btn-primary">
            {c.finalCtaBtn} →
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ MAIN ============
function AboutPage() {
  const { lang } = useI18n();
  const { mobile } = useRouter();
  const c = ABOUT_CONTENT[lang] || ABOUT_CONTENT.en;

  return (
    <main>
      <CoverSlab c={c} mobile={mobile} lang={lang} />
      <MissionBlock c={c} mobile={mobile} />
      <CaseFile c={c} mobile={mobile} lang={lang} />
      <Manifesto c={c} mobile={mobile} lang={lang} />
      <Team c={c} mobile={mobile} />
      <StatsDashboard c={c} mobile={mobile} lang={lang} />
      <FounderLetter c={c} mobile={mobile} />
      <Careers c={c} mobile={mobile} />
      <ContactBlock c={c} mobile={mobile} lang={lang} />
      <FinalAboutCta c={c} mobile={mobile} />
    </main>
  );
}

window.AboutPage = AboutPage;
