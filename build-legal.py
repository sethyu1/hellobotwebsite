"""Build legal HTML pages from docx sources.

Reads legal/source/*.docx with mammoth, wraps each in the site-styled template
defined in this file, and writes legal/<slug>.html. Also generates the
policies index page (legal/policies.html) listing all docs.
"""
from __future__ import annotations
import sys
from pathlib import Path
import mammoth

ROOT = Path(__file__).parent
SRC = ROOT / "legal" / "source"
OUT = ROOT / "legal"

# Source filename (in legal/source/) -> (output slug, display title in zh, short blurb)
DOCS = [
    ("user terms - cn.docx",                      "user-terms",              "用户服务协议",          "您与 HelloBot 之间的基础服务条款。"),
    ("privacy - cn.docx",                          "privacy",                 "隐私政策",              "我们如何收集、使用、共享和保护您的个人信息。"),
    ("community - cn.docx",                        "community",               "社区公约",              "在 HelloBot 内发布、互动、评论时应遵守的规则。"),
    ("auto-renewal-rule-cn.docx",                  "auto-renewal",            "自动续费规则",          "周期订阅的开通、扣费、提醒与取消方式。"),
    ("recharge-virtual-benefit-and-refund-rules-cn.docx", "recharge-and-refund", "充值、虚拟权益与退款规则", "积分（Cr）的购买、使用、有效期与退款政策。"),
    ("complaint report-cn.docx",                   "complaint-report",        "投诉举报规则",          "发现违规内容或不当行为时的反馈渠道与处理流程。"),
    ("Minor Use Restrictions - cn.docx",           "minor-use-restrictions",  "未成年人保护规则",      "针对未成年用户的额外限制与保护措施。"),
    ("Third-Party SDK and Data Sharing List - cn.docx", "third-party-sdk",    "第三方 SDK 与数据共享清单", "我们集成的第三方 SDK 及其数据共享情况。"),
]

# Order on the policies index. First three are also linked from the footer.
PRIMARY = {"user-terms", "privacy", "community"}

TEMPLATE = """<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#0B1020" />
<title>{title} · HelloBot</title>
<meta name="description" content="HelloBot — {title}" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Serif+SC:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles/system.css" />
<style>
  html, body {{ background: var(--bg-1); margin: 0; }}
  body {{ color: var(--ink-0); min-height: 100vh; }}

  .legal-top {{
    position: sticky; top: 0; z-index: 10;
    background: rgba(11,16,32,.85);
    backdrop-filter: saturate(150%) blur(10px);
    -webkit-backdrop-filter: saturate(150%) blur(10px);
    border-bottom: 1px solid var(--line-soft);
  }}
  .legal-top-inner {{
    max-width: 880px; margin: 0 auto;
    padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }}
  .legal-top a.brand {{
    display: inline-flex; align-items: center; gap: 8px;
    font-weight: 700; font-size: 16px; color: var(--ink-0);
  }}
  .legal-top a.brand .dot {{
    width: 8px; height: 8px; border-radius: 50%; background: var(--brand);
    display: inline-block;
  }}
  .legal-top a.back {{
    color: var(--ink-2); font-size: 13px;
    font-family: var(--font-mono); letter-spacing: .08em;
  }}
  .legal-top a.back:hover {{ color: var(--brand); }}

  .legal-wrap {{
    max-width: 720px; margin: 0 auto;
    padding: 56px 24px 96px;
  }}
  .legal-wrap .eyebrow {{
    font-family: var(--font-mono);
    font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 14px;
  }}
  .legal-wrap h1.doc-title {{
    font-size: 32px; line-height: 1.2; margin: 0 0 32px 0;
    letter-spacing: -.01em; font-weight: 700;
  }}

  /* Body content emitted by mammoth */
  .legal-body {{
    color: var(--ink-1);
    font-size: 15px; line-height: 1.85;
  }}
  .legal-body p {{ margin: 0 0 14px 0; }}
  .legal-body strong {{ color: var(--ink-0); font-weight: 600; }}
  .legal-body em {{ color: var(--ink-0); }}
  .legal-body a {{ color: var(--brand); text-decoration: underline; text-underline-offset: 3px; }}
  .legal-body a:hover {{ color: var(--brand-hot); }}

  /* Mammoth maps Word's Heading 1/2/3 to <h1>/<h2>/<h3>. The first <p> is the
     title block of the source doc; we leave it inline. */
  .legal-body h1 {{
    font-size: 20px; line-height: 1.4; font-weight: 700;
    color: var(--ink-0);
    margin: 36px 0 14px 0;
    letter-spacing: -.005em;
  }}
  .legal-body h2 {{
    font-size: 17px; line-height: 1.4; font-weight: 600;
    color: var(--ink-0);
    margin: 28px 0 10px 0;
  }}
  .legal-body h3 {{
    font-size: 15px; line-height: 1.5; font-weight: 600;
    color: var(--ink-0);
    margin: 22px 0 8px 0;
  }}

  .legal-body ul, .legal-body ol {{
    padding-left: 22px; margin: 0 0 14px 0;
  }}
  .legal-body li {{ margin: 0 0 6px 0; }}

  .legal-body table {{
    width: 100%; border-collapse: collapse;
    margin: 16px 0; font-size: 13.5px;
    border: 1px solid var(--line);
    background: var(--bg-2);
  }}
  .legal-body th, .legal-body td {{
    padding: 10px 12px;
    border: 1px solid var(--line);
    text-align: left; vertical-align: top;
  }}
  .legal-body th {{ background: var(--bg-3); color: var(--ink-0); font-weight: 600; }}
  .legal-body td {{ color: var(--ink-1); }}

  .legal-foot {{
    max-width: 720px; margin: 0 auto;
    padding: 24px 24px 64px;
    border-top: 1px dashed var(--line-soft);
    color: var(--ink-3); font-size: 12px;
    font-family: var(--font-mono); letter-spacing: .04em;
    display: flex; flex-wrap: wrap; gap: 8px 18px; justify-content: space-between;
  }}
  .legal-foot a {{ color: var(--ink-3); }}
  .legal-foot a:hover {{ color: var(--brand); }}

  @media (max-width: 640px) {{
    .legal-wrap {{ padding: 40px 20px 72px; }}
    .legal-wrap h1.doc-title {{ font-size: 26px; }}
    .legal-body {{ font-size: 14.5px; }}
  }}
</style>
</head>
<body>
<header class="legal-top">
  <div class="legal-top-inner">
    <a class="brand" href="../index.html"><span class="dot"></span> HelloBot</a>
    <a class="back" href="../index.html">← 返回首页</a>
  </div>
</header>
<main class="legal-wrap">
  <div class="eyebrow">{eyebrow}</div>
  <h1 class="doc-title">{title}</h1>
  <article class="legal-body">
{body}
  </article>
</main>
<footer class="legal-foot">
  <span>© HelloBot · 深圳润泽千川科技有限公司</span>
  <span><a href="policies.html">查看全部政策 →</a></span>
</footer>
</body>
</html>
"""


def convert_one(src: Path) -> str:
    with src.open("rb") as f:
        result = mammoth.convert_to_html(f)
    return result.value


def render_doc(slug: str, title: str, body: str) -> str:
    eyebrow = "法律与政策"
    return TEMPLATE.format(eyebrow=eyebrow, title=title, body=body)


def render_index(items: list[tuple[str, str, str]]) -> str:
    """items: list of (slug, title, blurb)"""
    rows = []
    for slug, title, blurb in items:
        primary_badge = '<span class="badge">主要政策</span>' if slug in PRIMARY else ""
        rows.append(
            f'''<a class="policy-row" href="{slug}.html">
  <div class="policy-row-text">
    <div class="policy-row-title">{title} {primary_badge}</div>
    <div class="policy-row-blurb">{blurb}</div>
  </div>
  <div class="policy-row-arrow">→</div>
</a>'''
        )
    body = '<div class="policy-list">\n' + "\n".join(rows) + "\n</div>"

    extra_css = """
  .policy-list { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: var(--bg-2); margin-top: 8px; }
  .legal-body a.policy-row, .legal-body a.policy-row:hover { text-decoration: none; color: inherit; }
  .policy-row { display: flex; align-items: center; gap: 16px; padding: 18px 20px; border-bottom: 1px solid var(--line-soft); transition: background .12s ease; }
  .policy-row:last-child { border-bottom: 0; }
  .policy-row:hover { background: var(--bg-3); }
  .policy-row-text { flex: 1; }
  .policy-row-title { color: var(--ink-0); font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .policy-row-blurb { color: var(--ink-2); font-size: 13.5px; line-height: 1.6; margin-top: 4px; }
  .policy-row-arrow { color: var(--ink-3); font-family: var(--font-mono); font-size: 18px; }
  .policy-row:hover .policy-row-arrow { color: var(--brand); }
  .badge { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--brand); border: 1px solid var(--brand-soft); background: var(--brand-soft); padding: 2px 8px; border-radius: 999px; font-weight: 500; }
  .policy-intro { color: var(--ink-2); font-size: 15px; line-height: 1.75; margin: 0 0 28px 0; }
"""
    rendered = TEMPLATE.format(
        eyebrow="法律与政策",
        title="更多政策",
        body=(
            f'<style>{extra_css}</style>'
            '<p class="policy-intro">下列文件构成您与 HelloBot 之间完整的法律与政策框架。点击任一条目查看详情。</p>'
            + body
        ),
    )
    return rendered


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)

    rendered_index_items: list[tuple[str, str, str]] = []
    for src_name, slug, title, blurb in DOCS:
        src_path = SRC / src_name
        if not src_path.exists():
            print(f"  ! missing: {src_path}", file=sys.stderr)
            continue
        body = convert_one(src_path)
        out_path = OUT / f"{slug}.html"
        out_path.write_text(render_doc(slug, title, body), encoding="utf-8")
        size_kb = out_path.stat().st_size / 1024
        print(f"  [ok] {out_path.name} ({size_kb:.1f} KB)")
        rendered_index_items.append((slug, title, blurb))

    # index page
    index_path = OUT / "policies.html"
    index_path.write_text(render_index(rendered_index_items), encoding="utf-8")
    print(f"  [ok] {index_path.name} (index, {len(rendered_index_items)} docs)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
