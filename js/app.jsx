/* App shell + router + tweaks */
const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA } = React;

const VALID_PAGES = ["home", "employees", "product", "cases", "pricing", "faq", "about"];
const pageFromHash = () => {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  return VALID_PAGES.indexOf(h) >= 0 ? h : "home";
};

function App({ initialPage = "home", initialLang = "zh", mobile = false, syncHash = false, autoMobile = false }) {
  const [page, setPage] = useStateA(() => syncHash ? pageFromHash() : initialPage);

  // Auto-detect mobile from viewport when requested.
  const [autoIsMobile, setAutoIsMobile] = useStateA(() =>
    autoMobile ? (typeof window !== "undefined" && window.innerWidth <= 768) : false
  );
  useEffectA(() => {
    if (!autoMobile) return;
    const onResize = () => setAutoIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [autoMobile]);
  const effectiveMobile = autoMobile ? autoIsMobile : mobile;

  // Sync URL hash <-> page state when requested.
  useEffectA(() => {
    if (!syncHash) return;
    const onHashChange = () => {
      const next = pageFromHash();
      setPage(next);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [syncHash]);

  const router = useMemoA(() => ({
    page,
    go: (p) => {
      setPage(p);
      if (syncHash && VALID_PAGES.indexOf(p) >= 0) {
        const target = "#/" + p;
        if (window.location.hash !== target) {
          window.history.pushState(null, "", target);
        }
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    mobile: effectiveMobile,
  }), [page, effectiveMobile, syncHash]);

  return (
    <I18nProvider initialLang={initialLang}>
      <RouterCtx.Provider value={router}>
        <div style={{ minHeight: "100%", background: "var(--bg-1)", color: "var(--ink-0)", fontFamily: "var(--font-sans)", position: "relative", overflow: "hidden" }}>
          <Nav />
          {page === "home" && <HomePage />}
          {page === "employees" && <EmployeesPage />}
          {page === "product" && <ProductPage />}
          {page === "cases" && <CasesPage />}
          {page === "pricing" && <PricingPage />}
          {page === "faq" && <FaqPage />}
          {page === "about" && <AboutPage />}
          <Footer />
        </div>
      </RouterCtx.Provider>
    </I18nProvider>
  );
}

window.App = App;
