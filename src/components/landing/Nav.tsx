import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

export const DEMO_URL = "/demo";
export const IOS_URL = "https://testflight.apple.com/join/TBehp4Fe";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`inline-flex items-center rounded-full border border-foreground/15 p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Choisir la langue / Choose language"
    >
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === "fr" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.features, href: "#features" },
    { label: t.nav.how, href: "#how" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-0.5 font-display text-xl tracking-tight text-foreground">
          <span className="font-bold">gool</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
        </a>

        <nav className="hidden md:flex items-center gap-9 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:inline-flex" />
          <a
            href={DEMO_URL}
            target={DEMO_URL.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-foreground text-background font-medium text-sm px-5 h-10 rounded-full hover:bg-accent-green hover:text-white transition-colors"
          >
            {t.nav.cta} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
