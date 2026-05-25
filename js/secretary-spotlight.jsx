// HelloBot · Secretary Spotlight
// A 15-second auto-playing animated workbench mock for "总经理秘书" / "Chief of Staff".
// Drops into ProductPage. Bilingual. No user controls.

const { useState: useStateSec, useEffect: useEffectSec, useRef: useRefSec } = React;

// ====== Bilingual content ======
const SEC_C = {
  zh: {
    eyebrow: "核心入口 · 执行总控",
    title: "总经理秘书",
    subtitle: "老板与管理层的执行系统总控台",
    desc: "不是记一次会议，而是把老板和管理层的执行系统长期管起来——会议纪要自动归档、行动项持续追踪、周报自动汇总、日程与提醒实时同步。",
    deliveryTitle: "核心交付",
    deliveries: ["会议纪要归档", "行动项追踪", "周报自动汇总", "日程管理", "待办提醒", "决策记录"],
    timelineLabels: ["监听会议", "提取行动项", "写入日历", "导出周报", "推送提醒"],

    meetingTitle: "周会 · 产品评审",
    meetingTime: "9:00 AM · 会议中",
    meetingLines: [
      { who: "余总", text: "下周二之前完成 V2 视觉走查。", role: "boss" },
      { who: "林一可", text: "我跟设计同步，周四给到稿。", role: "team" },
      { who: "周以观", text: "用户访谈整理稿明天发群里。", role: "team" },
      { who: "余总", text: "记一下：周报里要包含 NPS 数据。", role: "boss" },
    ],

    actionsTitle: "提取到 3 个行动项",
    actions: [
      { owner: "周以观", task: "完成 V2 视觉走查", due: "周二", color: "#B58CFF" },
      { owner: "林一可", task: "同步设计稿", due: "周四", color: "#3BCB7A" },
      { owner: "周以观", task: "整理用户访谈稿", due: "明天", color: "#B58CFF" },
    ],

    calTitle: "已写入日历",
    calSub: "3 个事件已同步至 Google Calendar",
    calDay: "本周",
    weekdays: ["一", "二", "三", "四", "五"],
    calEvents: [
      { day: 1, title: "整理访谈稿", time: "10:00", color: "#B58CFF" },
      { day: 3, title: "设计稿评审", time: "14:00", color: "#3BCB7A" },
      { day: 1, title: "V2 走查 D1", time: "16:00", color: "#FF8A3D" },
    ],

    excelTitle: "正在生成周报.xlsx",
    excelSub: "5 个 sheet · 含 NPS 数据",
    excelHeaders: ["项目", "负责人", "状态", "预计完成"],
    excelRows: [
      ["V2 视觉走查", "周以观", "进行中", "周二"],
      ["设计稿同步", "林一可", "未开始", "周四"],
      ["访谈整理", "周以观", "已完成", "明天"],
      ["NPS 数据", "Lina", "已完成", "—"],
    ],
    excelFooter: "周报_W47.xlsx · 3.2 KB",

    pushTitle: "已推送至飞书",
    pushSub: "3 条提醒，命中负责人",
    pushItems: [
      { who: "周以观", text: "您有 1 项明日到期：访谈整理" },
      { who: "林一可", text: "您有 1 项周四到期：设计稿同步" },
      { who: "余总", text: "本周周报已生成，请审阅" },
    ],

    badgeNow: "实时演示",
    finalLine: "她不只记了一次会，她把整个系统跑起来了。",
  },
  en: {
    eyebrow: "Core Role · Execution Hub",
    title: "Chief of Staff",
    subtitle: "Your executive team's long-running operating system",
    desc: "Not just minute-taking — she runs the whole execution loop: archiving meeting notes, tracking action items, drafting weekly reports, and syncing schedules and reminders in real time.",
    deliveryTitle: "Core Deliveries",
    deliveries: ["Meeting Archive", "Action Tracking", "Weekly Reports", "Calendar Sync", "Reminders", "Decision Log"],
    timelineLabels: ["Listening", "Extract Items", "Sync Calendar", "Export Report", "Push Reminders"],

    meetingTitle: "Weekly · Product Review",
    meetingTime: "9:00 AM · Live",
    meetingLines: [
      { who: "Yu", text: "Finish V2 visual review by next Tuesday.", role: "boss" },
      { who: "Lin", text: "I'll sync with design and ship Thursday.", role: "team" },
      { who: "Zhou", text: "User interview notes go out tomorrow.", role: "team" },
      { who: "Yu", text: "Note this: include NPS data in the weekly.", role: "boss" },
    ],

    actionsTitle: "Extracted 3 action items",
    actions: [
      { owner: "Zhou", task: "Complete V2 visual review", due: "Tue", color: "#B58CFF" },
      { owner: "Lin", task: "Sync design files", due: "Thu", color: "#3BCB7A" },
      { owner: "Zhou", task: "Send interview notes", due: "Tomorrow", color: "#B58CFF" },
    ],

    calTitle: "Added to calendar",
    calSub: "3 events synced to Google Calendar",
    calDay: "This week",
    weekdays: ["M", "T", "W", "T", "F"],
    calEvents: [
      { day: 1, title: "Interview notes", time: "10:00", color: "#B58CFF" },
      { day: 3, title: "Design review", time: "14:00", color: "#3BCB7A" },
      { day: 1, title: "V2 review D1", time: "16:00", color: "#FF8A3D" },
    ],

    excelTitle: "Generating Weekly.xlsx",
    excelSub: "5 sheets · with NPS data",
    excelHeaders: ["Project", "Owner", "Status", "Due"],
    excelRows: [
      ["V2 Visual Review", "Zhou", "In progress", "Tue"],
      ["Design Sync", "Lin", "Not started", "Thu"],
      ["Interview Notes", "Zhou", "Done", "Tomorrow"],
      ["NPS Data", "Lina", "Done", "—"],
    ],
    excelFooter: "Weekly_W47.xlsx · 3.2 KB",

    pushTitle: "Pushed to Lark",
    pushSub: "3 reminders, hit on owner",
    pushItems: [
      { who: "Zhou", text: "1 item due tomorrow: interview notes" },
      { who: "Lin", text: "1 item due Thursday: design sync" },
      { who: "Yu", text: "Weekly report generated. Please review." },
    ],

    badgeNow: "LIVE DEMO",
    finalLine: "She didn't just take notes — she ran the system.",
  },
};

// ====== Hero slab (matches user's reference screenshot) ======
function SecHero({ c, mobile }) {
  return (
    <div style={{
      borderRadius: 16,
      background: "linear-gradient(180deg, #0E1530 0%, #0A0F22 100%)",
      border: "1px solid var(--line)",
      padding: mobile ? "26px 22px" : "40px 44px",
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "1.1fr 1fr",
      gap: mobile ? 24 : 56,
      alignItems: "start",
    }}>
      {/* LEFT */}
      <div>
        <span style={{
          display: "inline-block", padding: "5px 12px", borderRadius: 999,
          background: "rgba(255,138,61,.14)", color: "var(--brand)",
          fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".15em",
          textTransform: "uppercase", border: "1px solid rgba(255,138,61,.35)",
        }}>● {c.eyebrow}</span>
        <h2 style={{
          marginTop: 16, fontSize: mobile ? 38 : 52, fontWeight: 800,
          letterSpacing: "-.02em", lineHeight: 1.05,
        }}>{c.title}</h2>
        <div style={{
          marginTop: 10, color: "var(--brand)", fontWeight: 700,
          fontSize: mobile ? 16 : 18,
        }}>{c.subtitle}</div>
        <p style={{
          marginTop: 16, color: "var(--ink-1)", fontSize: 15,
          lineHeight: 1.7, maxWidth: 520,
        }}>{c.desc}</p>
      </div>
      {/* RIGHT - delivery list */}
      <div>
        <div className="t-mono" style={{
          fontSize: 11, color: "var(--ink-3)", letterSpacing: ".18em", textTransform: "uppercase",
        }}>{c.deliveryTitle}</div>
        <div style={{
          marginTop: 16, display: "grid",
          gridTemplateColumns: "1fr 1fr", rowGap: 12, columnGap: 24,
        }}>
          {c.deliveries.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ink-0)" }}>
              <span style={{ color: "var(--brand)", fontSize: 12 }}>◆</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====== Phase tracker (top of workbench) ======
function PhaseStrip({ phase, labels }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8,
      padding: "12px 16px", background: "var(--bg-3)",
      borderBottom: "1px solid var(--line)",
    }}>
      {labels.map((l, i) => {
        const active = i === phase;
        const done = i < phase;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, opacity: done || active ? 1 : .35 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 999,
              background: done ? "var(--ok)" : active ? "var(--brand)" : "var(--bg-2)",
              border: `1px solid ${done ? "var(--ok)" : active ? "var(--brand)" : "var(--line)"}`,
              color: "var(--bg-1)", fontFamily: "var(--font-mono)", fontWeight: 700,
              fontSize: 10, display: "grid", placeItems: "center", flexShrink: 0,
              transition: "all .25s",
              boxShadow: active ? "0 0 0 4px rgba(255,138,61,.18)" : "none",
            }}>{done ? "✓" : i + 1}</span>
            <span className="t-mono" style={{
              fontSize: 10.5, letterSpacing: ".08em", color: active ? "var(--ink-0)" : "var(--ink-2)",
              textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{l}</span>
          </div>
        );
      })}
    </div>
  );
}

// ====== Phase 1: Meeting transcription ======
function PhaseMeeting({ c, t }) {
  // t goes 0 → 3000 ms within this phase
  const visibleLines = Math.min(c.meetingLines.length, Math.floor(t / 700));
  const currentLineProgress = Math.min(1, (t - visibleLines * 700) / 600);

  return (
    <div style={{ padding: 22, height: "100%" }}>
      {/* header with mic + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: "rgba(255,92,92,.12)",
          border: "1px solid rgba(255,92,92,.4)",
          display: "grid", placeItems: "center", color: "var(--bad)",
          animation: "secPulse 1.2s ease-in-out infinite",
        }}>●</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{c.meetingTitle}</div>
          <div className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".1em", marginTop: 2 }}>{c.meetingTime}</div>
        </div>
        {/* waveform */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 24 }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const phase = (t / 80 + i * 0.6) % 6.28;
            const h = 5 + Math.abs(Math.sin(phase)) * 18;
            return <span key={i} style={{ width: 3, height: h, background: "var(--brand)", borderRadius: 2, transition: "height .1s" }} />;
          })}
        </div>
      </div>

      {/* transcript */}
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {c.meetingLines.slice(0, visibleLines + 1).map((line, i) => {
          const isCurrent = i === visibleLines;
          const text = isCurrent ? line.text.slice(0, Math.floor(line.text.length * currentLineProgress)) : line.text;
          if (isCurrent && text === "") return null;
          return (
            <div key={i} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              opacity: 0, animation: `secFadeIn .3s ease forwards`, animationDelay: "0s",
            }} className="sec-fade">
              <span style={{
                fontSize: 11, fontFamily: "var(--font-mono)",
                color: line.role === "boss" ? "var(--brand)" : "var(--ink-2)",
                fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                background: line.role === "boss" ? "rgba(255,138,61,.12)" : "rgba(255,255,255,.04)",
                flexShrink: 0,
              }}>{line.who}</span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-1)" }}>
                {text}{isCurrent && <span style={{ display: "inline-block", width: 8, height: 14, background: "var(--brand)", marginLeft: 2, verticalAlign: "middle", animation: "secBlink 1s steps(2) infinite" }} />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ====== Phase 2: Action items extraction ======
function PhaseActions({ c, t }) {
  // t goes 0 → 2000 ms
  const reveal = Math.min(c.actions.length, Math.floor(t / 380));
  return (
    <div style={{ padding: 22, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 26, height: 26, borderRadius: 7, background: "var(--brand)", color: "var(--brand-ink)",
          display: "grid", placeItems: "center", fontSize: 14, fontWeight: 800,
        }}>✦</span>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{c.actionsTitle}</div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {c.actions.map((a, i) => {
          const visible = i < reveal;
          return (
            <div key={i} style={{
              padding: "12px 14px", borderRadius: 10, background: "var(--bg-3)",
              border: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              opacity: visible ? 1 : 0,
              transition: "all .35s cubic-bezier(.2,.8,.2,1)",
            }}>
              <span style={{
                width: 32, height: 32, borderRadius: 8, background: a.color,
                display: "grid", placeItems: "center", color: "#fff", fontWeight: 800,
                fontSize: 13, flexShrink: 0,
              }}>{a.owner.slice(0, 1)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: "var(--ink-0)", fontWeight: 600 }}>{a.task}</div>
                <div className="t-mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 3, letterSpacing: ".06em" }}>
                  @{a.owner} · {a.due}
                </div>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                padding: "3px 8px", borderRadius: 4, background: "rgba(59,203,122,.14)",
                color: "var(--ok)", border: "1px solid rgba(59,203,122,.3)",
              }}>NEW</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ====== Phase 3: Calendar sync ======
function PhaseCalendar({ c, t }) {
  // t goes 0 → 3000 ms
  // Events drop in one by one
  const reveal = Math.min(c.calEvents.length, Math.floor(t / 600));
  return (
    <div style={{ padding: 22, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 26, height: 26, borderRadius: 7, background: "var(--info)", color: "#fff",
          display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800,
        }}>📅</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{c.calTitle}</div>
          <div className="t-mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 1 }}>{c.calSub}</div>
        </div>
      </div>

      {/* Mini calendar */}
      <div style={{
        marginTop: 16, background: "var(--bg-3)", border: "1px solid var(--line)",
        borderRadius: 10, overflow: "hidden",
      }}>
        <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="t-mono" style={{ fontSize: 10.5, color: "var(--ink-2)", letterSpacing: ".15em", textTransform: "uppercase" }}>{c.calDay}</span>
          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>WK 47</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderBottom: "1px solid var(--line)" }}>
          {c.weekdays.map((d, i) => (
            <div key={i} style={{
              padding: "6px 0", textAlign: "center",
              fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)",
              borderRight: i < 4 ? "1px solid var(--line)" : "none",
            }}>{d}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", minHeight: 132, position: "relative" }}>
          {[0, 1, 2, 3, 4].map(col => (
            <div key={col} style={{
              borderRight: col < 4 ? "1px solid var(--line)" : "none",
              padding: 4, display: "flex", flexDirection: "column", gap: 4,
            }}>
              {c.calEvents.map((ev, i) => {
                if (ev.day !== col || i >= reveal) return null;
                return (
                  <div key={i} style={{
                    padding: "6px 8px", borderRadius: 5, background: ev.color,
                    color: ev.color === "#FF8A3D" ? "var(--brand-ink)" : "rgba(0,0,0,.85)",
                    fontSize: 10.5, fontWeight: 600,
                    animation: "secDropIn .4s cubic-bezier(.2,.9,.3,1.4) backwards",
                  }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: .8 }}>{ev.time}</div>
                    <div style={{ marginTop: 1, lineHeight: 1.2 }}>{ev.title}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ====== Phase 4: Excel export ======
function PhaseExcel({ c, t }) {
  // t goes 0 → 3000 ms
  // Fill rows top-down, then file appears at bottom
  const rowsVisible = Math.min(c.excelRows.length, Math.floor(t / 350));
  const fileAppear = t > 1800;
  return (
    <div style={{ padding: 22, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 26, height: 26, borderRadius: 7, background: "var(--ok)", color: "#0A1A0F",
          display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800,
        }}>📊</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{c.excelTitle}</div>
          <div className="t-mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 1 }}>{c.excelSub}</div>
        </div>
      </div>

      {/* Fake Excel grid */}
      <div style={{
        marginTop: 14, background: "#FAFAF6", borderRadius: 8, overflow: "hidden",
        border: "1px solid var(--line)",
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr .8fr",
          background: "#1F7A4D", color: "#FAFAF6",
        }}>
          {c.excelHeaders.map((h, i) => (
            <div key={i} style={{
              padding: "7px 10px", fontSize: 11, fontWeight: 700,
              borderRight: i < c.excelHeaders.length - 1 ? "1px solid rgba(255,255,255,.15)" : "none",
              fontFamily: "var(--font-mono)", letterSpacing: ".05em",
            }}>{h}</div>
          ))}
        </div>
        {c.excelRows.map((row, ri) => (
          <div key={ri} style={{
            display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr .8fr",
            background: ri % 2 ? "#F0EDE2" : "#FAFAF6",
            opacity: ri < rowsVisible ? 1 : 0,
            transform: ri < rowsVisible ? "translateY(0)" : "translateY(8px)",
            transition: "all .25s",
          }}>
            {row.map((cell, ci) => (
              <div key={ci} style={{
                padding: "6px 10px", fontSize: 11, color: "#1A1812",
                borderRight: ci < row.length - 1 ? "1px solid #DDD7C4" : "none",
                borderTop: "1px solid #DDD7C4",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                fontFamily: ci === 0 ? "var(--font-sans)" : "var(--font-mono)",
                fontWeight: ci === 0 ? 600 : 400,
              }}>
                {ci === 2 && cell.match(/已完成|Done/) ? (
                  <span style={{ color: "#1F7A4D", fontWeight: 600 }}>● {cell}</span>
                ) : ci === 2 && cell.match(/进行中|In progress/) ? (
                  <span style={{ color: "#C77A1F", fontWeight: 600 }}>● {cell}</span>
                ) : cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* File output card */}
      <div style={{
        marginTop: 14, padding: "10px 14px", borderRadius: 8,
        background: "rgba(59,203,122,.08)", border: "1px dashed var(--ok)",
        display: "flex", alignItems: "center", gap: 12,
        opacity: fileAppear ? 1 : 0, transform: fileAppear ? "translateY(0)" : "translateY(10px)",
        transition: "all .35s",
      }}>
        <span style={{
          width: 30, height: 36, borderRadius: 4, background: "#1F7A4D", color: "#fff",
          display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800,
          fontFamily: "var(--font-mono)",
        }}>XLS</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="t-mono" style={{ fontSize: 11.5, color: "var(--ink-0)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {c.excelFooter}
          </div>
        </div>
        <span style={{ color: "var(--ok)", fontSize: 18 }}>↓</span>
      </div>
    </div>
  );
}

// ====== Phase 5: IM push ======
function PhasePush({ c, t }) {
  // t goes 0 → 3000 ms
  const reveal = Math.min(c.pushItems.length, Math.floor(t / 500));
  return (
    <div style={{ padding: 22, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 26, height: 26, borderRadius: 7, background: "var(--plum)", color: "#fff",
          display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800,
        }}>✉</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{c.pushTitle}</div>
          <div className="t-mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 1 }}>{c.pushSub}</div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {c.pushItems.map((p, i) => {
          const visible = i < reveal;
          return (
            <div key={i} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              padding: "10px 12px", borderRadius: 10,
              background: "var(--bg-3)", border: "1px solid var(--line)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "all .3s",
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: 999,
                background: "linear-gradient(135deg, #FF8A3D, #B58CFF)",
                display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 11,
                flexShrink: 0,
              }}>{p.who.slice(0, 1)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-0)" }}>@{p.who}</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-1)", marginTop: 2, lineHeight: 1.45 }}>{p.text}</div>
              </div>
              <span className="t-mono" style={{ fontSize: 9.5, color: "var(--ink-3)", letterSpacing: ".1em", flexShrink: 0 }}>SENT</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ====== Workbench shell with auto-playing timeline ======
const SEC_PHASES = [
  { dur: 3000, key: "meeting" },
  { dur: 2200, key: "actions" },
  { dur: 3000, key: "calendar" },
  { dur: 3500, key: "excel" },
  { dur: 3000, key: "push" },
  { dur: 800, key: "rest" }, // brief pause before loop
];
const SEC_TOTAL = SEC_PHASES.reduce((a, p) => a + p.dur, 0);

function SecretaryWorkbench({ c }) {
  const [now, setNow] = useStateSec(0);
  const startRef = useRefSec(null);
  const rafRef = useRefSec(null);

  useEffectSec(() => {
    const tick = (ts) => {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = (ts - startRef.current) % SEC_TOTAL;
      setNow(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Determine current phase + local time
  let phase = 0, local = now;
  for (let i = 0; i < SEC_PHASES.length; i++) {
    if (local < SEC_PHASES[i].dur) { phase = i; break; }
    local -= SEC_PHASES[i].dur;
  }

  const renderPhase = () => {
    const p = SEC_PHASES[phase].key;
    if (p === "meeting")  return <PhaseMeeting c={c} t={local} />;
    if (p === "actions")  return <PhaseActions c={c} t={local} />;
    if (p === "calendar") return <PhaseCalendar c={c} t={local} />;
    if (p === "excel")    return <PhaseExcel c={c} t={local} />;
    if (p === "push")     return <PhasePush c={c} t={local} />;
    return <PhaseMeeting c={c} t={3000} />; // rest = freeze
  };

  // overall progress 0..1
  const progress = now / SEC_TOTAL;
  const visiblePhase = Math.min(phase, 4);

  return (
    <div style={{
      borderRadius: 16, background: "var(--bg-2)",
      border: "1px solid var(--line)", overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,.35)",
    }}>
      {/* Window chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px", background: "var(--bg-3)",
        borderBottom: "1px solid var(--line)",
      }}>
        <span style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#FF5C5C" }} />
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#F2C94C" }} />
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#3BCB7A" }} />
        </span>
        <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", marginLeft: 8 }}>
          chief-of-staff.app · workbench
        </span>
        <span style={{ flex: 1 }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9.5, padding: "3px 8px",
          background: "rgba(255,92,92,.14)", color: "var(--bad)",
          border: "1px solid rgba(255,92,92,.4)", borderRadius: 4, letterSpacing: ".1em",
        }}>● {c.badgeNow}</span>
      </div>

      {/* Phase strip */}
      <PhaseStrip phase={visiblePhase} labels={c.timelineLabels} />

      {/* Active phase area */}
      <div style={{ minHeight: 320, position: "relative" }}>
        {renderPhase()}
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "var(--bg-3)", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0, right: "auto",
          width: `${progress * 100}%`, background: "var(--brand)",
          transition: "width .1s linear",
        }} />
      </div>
    </div>
  );
}

// ====== Public Spotlight section (drop into ProductPage) ======
function SecretarySpotlight() {
  const { lang } = useI18n();
  const { mobile } = useRouter();
  const c = SEC_C[lang] || SEC_C.en;

  return (
    <section className="section-sm">
      <div className="container">
        <SectionHeader
          eyebrow={lang === "zh" ? "实时演示" : "Live Demo"}
          title={lang === "zh" ? "看一眼她是怎么工作的" : "Here's how she actually works"}
          num="C"
        />
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 18 }}>
          <SecHero c={c} mobile={mobile} />
          <SecretaryWorkbench c={c} />
          <div className="t-serif" style={{
            textAlign: "center", marginTop: 6,
            fontSize: mobile ? 17 : 22, color: "var(--ink-1)",
            fontStyle: "italic",
          }}>
            "{c.finalLine}"
          </div>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes secPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: .7; }
        }
        @keyframes secBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes secFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes secDropIn {
          0%   { opacity: 0; transform: translateY(-8px) scale(.92); }
          60%  { opacity: 1; transform: translateY(2px) scale(1.04); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .sec-fade { animation: secFadeIn .3s ease forwards; }
      `}</style>
    </section>
  );
}

window.SecretarySpotlight = SecretarySpotlight;
