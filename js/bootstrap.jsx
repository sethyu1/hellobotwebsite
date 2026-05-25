/* Production root render. Mounts <App> with hash routing + auto-mobile,
   and persists the user's language choice across visits. */

(function () {
  const root = document.getElementById("root");
  if (!root) return;

  // Initial language: stored preference > navigator > zh
  let savedLang = null;
  try { savedLang = localStorage.getItem("hb-lang"); } catch (e) {}
  const initialLang = (savedLang === "zh" || savedLang === "en")
    ? savedLang
    : ((navigator.language || "zh").toLowerCase().startsWith("zh") ? "zh" : "en");

  // Watch the rendered I18nProvider's lang-zh / lang-en class and persist it.
  const obs = new MutationObserver(() => {
    const el = root.querySelector(".lang-zh, .lang-en");
    if (!el) return;
    const lang = el.classList.contains("lang-zh") ? "zh" : "en";
    try { localStorage.setItem("hb-lang", lang); } catch (e) {}
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
  });
  obs.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });

  const App = window.App;
  ReactDOM.createRoot(root).render(
    <App initialLang={initialLang} syncHash={true} autoMobile={true} />
  );
})();
