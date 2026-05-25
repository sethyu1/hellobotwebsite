// HelloBot — static bundle build.
//
// Each source file uses script-level `const { useState, ... } = React` and
// publishes its public symbols via `window.X = X` / `Object.assign(window, ...)`.
// We preserve that pattern but wrap each file in an IIFE so top-level `const`
// declarations stay file-local (otherwise concatenation collides — e.g. both
// app.jsx and about.jsx declare useStateA / useEffectA).
//
// Output: dist/bundle.js — load order matches the original index.html.

import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const FILES = [
  "js/content.js",
  "js/components.jsx",
  "js/home.jsx",
  "js/diary.jsx",
  "js/product-sections.jsx",
  "js/pages.jsx",
  "js/cases-page.jsx",
  "js/pricing-page.jsx",
  "js/about.jsx",
  "js/secretary-spotlight.jsx",
  "js/app.jsx",
  "js/bootstrap.jsx",
];

const OUT_DIR = "dist";
const OUT_FILE = path.join(OUT_DIR, "bundle.js");

async function buildOnce({ minify }) {
  const parts = [
    `/* HelloBot bundle — built ${new Date().toISOString()} */`,
    `/* Each module is wrapped in an IIFE; cross-module symbols travel via window.* */`,
  ];

  for (const file of FILES) {
    const src = await fs.readFile(file, "utf8");
    const isJsx = file.endsWith(".jsx");
    const result = await esbuild.transform(src, {
      loader: isJsx ? "jsx" : "js",
      jsx: "transform",        // classic React.createElement — `React` is on window
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
      target: "es2019",        // wide browser support; modern enough to be small
      minify,
      sourcemap: false,
    });
    parts.push(
      `\n/* ===== ${file} ===== */`,
      `(function(){\n${result.code}\n}).call(window);`,
    );
  }

  if (!existsSync(OUT_DIR)) await fs.mkdir(OUT_DIR, { recursive: true });
  const out = parts.join("\n");
  await fs.writeFile(OUT_FILE, out);

  const bytes = Buffer.byteLength(out, "utf8");
  const kb = (bytes / 1024).toFixed(1);
  console.log(`✓ wrote ${OUT_FILE} — ${kb} KB${minify ? " (minified)" : ""}`);
}

const watch = process.argv.includes("--watch");
const minify = !process.argv.includes("--no-minify");

await buildOnce({ minify });

if (watch) {
  const { default: chokidar } = await import("chokidar");
  console.log("→ watching js/ for changes (Ctrl+C to stop)");
  let pending = false;
  const rebuild = async () => {
    if (pending) return;
    pending = true;
    setTimeout(async () => {
      pending = false;
      try { await buildOnce({ minify: false }); }
      catch (e) { console.error("✗", e.message); }
    }, 50);
  };
  chokidar.watch("js/**/*.{js,jsx}", { ignoreInitial: true }).on("all", rebuild);
}
