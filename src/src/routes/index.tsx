import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, DEMO_URL } from "@/components/landing/Nav";
import { useReveal, useCountUp } from "@/components/landing/hooks";
import { PhoneShell } from "@/components/landing/PhoneShell";
import { PostScreen } from "@/components/landing/ScreenMockups";
import { Icon } from "@/components/landing/icons";
import { useLanguage } from "@/lib/i18n";

import homeImg from "@/assets/screens/home.png.jpeg";
import coachImg from "@/assets/screens/coach.png.jpeg";
import objectiveImg from "@/assets/screens/objective.png.jpeg";
import feedImg from "@/assets/screens/feed.png.jpeg";
import groupsImg from "@/assets/screens/groups.png.jpeg";
import leaderboardImg from "@/assets/screens/leaderboard.png.jpeg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "gool. — Atteins enfin tes objectifs." },
      {
        name: "description",
        content:
          "Gool combine coach IA, streaks et groupes d'accountability pour que tu atteignes vraiment tes objectifs.",
      },
    ],
  }),
});

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function DemoButton({
  size = "md",
  variant = "primary",
  children,
  href = DEMO_URL,
}: {
  size?: "md" | "lg";
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  href?: string;
}) {
  const sz = size === "lg" ? "h-12 px-7 text-[15px]" : "h-10 px-5 text-sm";
  const styles =
    variant === "primary"
      ? "bg-accent-green text-white hover:brightness-105 glow-green-soft"
      : "bg-transparent border border-foreground/15 text-foreground hover:bg-foreground/5";
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={`group inline-flex items-center gap-2 font-medium rounded-full transition-all active:scale-[0.97] hover:scale-[1.03] ${sz} ${styles}`}
    >
      {children}{" "}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}

function Landing() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <ExplainerVideo />
      <Pillars />
      <HowItWorks />
      <FeatureShowcase />
      <Loop />
      <Stats />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ============ HERO ============ */
function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 dotted-bg pointer-events-none" />
      {/* Decorative floating blobs */}
      <div
        aria-hidden
        className="hidden md:block absolute -top-10 left-[8%] w-40 h-40 rounded-full bg-accent-green/10 blur-2xl animate-blob pointer-events-none"
      />
      <div
        aria-hidden
        className="hidden md:block absolute top-24 right-[10%] w-56 h-56 rounded-full bg-accent-green/10 blur-2xl animate-blob pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8 text-center">
        <h1
          className="font-display text-5xl sm:text-6xl md:text-[76px] leading-[1.02] text-foreground animate-fade-up"
          style={{ letterSpacing: "-0.04em" }}
        >
          {t.hero.title1}
          <br className="hidden sm:block" />
          <span className="text-accent-green">{t.hero.title2}</span>
        </h1>

        <p
          className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          {t.hero.subtitle}
        </p>

        <div
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <DemoButton size="lg">{t.hero.ctaPrimary}</DemoButton>
          <DemoButton size="lg" variant="ghost" href="#video">
            {t.hero.ctaSecondary}
          </DemoButton>
        </div>

        <p
          className="mt-4 text-xs text-muted-foreground animate-fade-up"
          style={{ animationDelay: "280ms" }}
        >
          {t.hero.freemium}
        </p>

        <div
          className="mt-16 md:mt-24 flex justify-center animate-fade-up"
          style={{ animationDelay: "380ms" }}
        >
          <PhoneStack />
        </div>

        <p
          className="mt-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 animate-fade-up"
          style={{ animationDelay: "460ms" }}
        >
          {t.hero.caption}
        </p>
      </div>
    </section>
  );
}

/* ============ PHONE STACK (real screenshots + one coded mockup) ============ */
function PhoneStack() {
  return (
    <div className="relative inline-flex items-end justify-center">
      {/* Back phone — leaderboard (real) */}
      <div className="hidden md:block absolute -left-44 bottom-6">
        <PhoneShell
          src={leaderboardImg}
          alt="Classement gool — XP et rang"
          tilt={-8}
          width={230}
          z={1}
        />
      </div>
      {/* Front phone — Home (real) */}
      <div className="relative">
        <PhoneShell
          src={homeImg}
          alt="Écran d'accueil de gool — check-in du jour et objectifs"
          tilt={0}
          width={290}
          z={3}
        />
      </div>
      {/* Right phone — Post (coded mockup, kept because it already looks great) */}
      <div className="hidden lg:block absolute -right-44 bottom-6">
        <PhoneShell alt="Détail d'un post communauté gool" tilt={5} width={230} z={1}>
          <PostScreen />
        </PhoneShell>
      </div>
    </div>
  );
}

/* ============ EXPLAINER VIDEO ============ */
function ExplainerVideo() {
  const { t } = useLanguage();
  return (
    <section id="video" className="py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-green font-semibold">
            {t.video.tag}
          </p>
          <h2
            className="mt-3 font-display text-3xl md:text-4xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            {t.video.title}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t.video.subtitle}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <button
            type="button"
            aria-label={t.video.playLabel}
            className="group relative w-full aspect-video rounded-[1.75rem] overflow-hidden bg-[#0F1A14] soft-shadow transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: "radial-gradient(rgba(22,163,74,0.6) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 75%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent-green text-white text-2xl md:text-3xl glow-green-soft animate-pulse-glow transition-transform group-hover:scale-110">
                ▶
              </span>
            </div>
            <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white/70 text-xs md:text-sm">
              {t.video.placeholder}
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ PILLARS ============ */
function Pillars() {
  const { t } = useLanguage();
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-accent-green font-semibold">
            {t.pillars.tag}
          </p>
          <h2
            className="mt-3 font-display text-4xl md:text-5xl max-w-2xl text-foreground"
            style={{ letterSpacing: "-0.035em" }}
          >
            {t.pillars.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">{t.pillars.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.pillars.items.map((p, i) => (
            <Reveal key={p.t} delay={i * 60}>
              <div className="h-full rounded-2xl bg-white border border-border p-6 hover:border-accent-green/40 hover:-translate-y-1 hover:shadow-lg transition-all soft-shadow">
                <div className="w-11 h-11 rounded-xl bg-accent-green/10 grid place-items-center text-accent-green">
                  <Icon name={p.icon} className="w-5 h-5" />
                </div>
                <h3 className="mt-5 font-display text-xl text-foreground">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ HOW IT WORKS ============ */
function HowItWorks() {
  const { t } = useLanguage();
  return (
    <section id="how" className="py-24 md:py-32 bg-secondary/40 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-accent-green font-semibold">
            {t.how.tag}
          </p>
          <h2
            className="mt-3 font-display text-4xl md:text-5xl max-w-2xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            {t.how.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="h-full rounded-2xl bg-white border border-border p-6 soft-shadow hover:-translate-y-1 transition-all">
                <span className="font-display text-3xl text-accent-green font-bold">{s.n}</span>
                <h3 className="mt-4 font-display text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FEATURE SHOWCASE — real screenshots, minimal copy ============ */
function FeatureShowcase() {
  const { t } = useLanguage();
  const images = [coachImg, homeImg, objectiveImg, leaderboardImg, groupsImg, feedImg];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 space-y-20 md:space-y-28">
        {t.features.rows.map((row, i) => (
          <Row
            key={row.tag}
            reverse={i % 2 === 1}
            tag={row.tag}
            title={row.title}
            caption={row.caption}
            image={images[i]}
          />
        ))}
      </div>
    </section>
  );
}

function Row({
  tag,
  title,
  caption,
  image,
  reverse,
}: {
  tag: string;
  title: string;
  caption: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <Reveal>
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-accent-green/10 text-accent-green font-semibold">
          {tag}
        </span>
        <h3
          className="mt-4 font-display text-2xl md:text-3xl max-w-sm"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>
        <p className="mt-3 text-muted-foreground max-w-sm leading-relaxed">{caption}</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="flex justify-center">
          <RealPhone alt={title}>
            <img src={image} alt={title} className="w-full h-full object-cover" draggable={false} />
          </RealPhone>
        </div>
      </Reveal>
    </div>
  );
}

function RealPhone({ alt, children }: { alt: string; children: React.ReactNode }) {
  return (
    <div
      className="relative w-full max-w-[320px] rounded-[2rem] bg-[#1A1A22] p-8 md:p-10 overflow-hidden"
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 60px -30px rgba(0,0,0,0.45)",
      }}
    >
      {/* Subtle dotted texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative flex justify-center">
        <PhoneShell alt={alt} width={240} tilt={0} glow>
          {children}
        </PhoneShell>
      </div>
    </div>
  );
}

/* ============ HOOKED LOOP ============ */
function Loop() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32 bg-secondary/40 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-accent-green font-semibold">
            {t.loop.tag}
          </p>
          <h2
            className="mt-3 font-display text-4xl md:text-5xl max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            {t.loop.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">{t.loop.subtitle}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {t.loop.steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="h-full rounded-2xl bg-white border border-border p-6 relative soft-shadow hover:-translate-y-1 hover:rotate-[0.5deg] transition-all">
                <div className="w-10 h-10 rounded-full bg-accent-green/10 grid place-items-center text-accent-green">
                  <Icon name={s.icon} className="w-4.5 h-4.5" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <h3 className="mt-1 font-display text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ STATS ============ */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { lang } = useLanguage();
  const { ref, val } = useCountUp(value, 1600);
  return (
    <div className="text-center">
      <span className="block font-display text-4xl md:text-5xl text-foreground" ref={ref}>
        {val.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Stats() {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 rounded-[2rem] bg-white border border-border p-10 md:p-12 soft-shadow">
            {t.stats.items.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
const AVATAR_GRADIENTS = [
  "from-fuchsia-500 to-rose-500",
  "from-emerald-400 to-teal-600",
  "from-indigo-400 to-violet-600",
];

function Testimonials() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-accent-green font-semibold">
            {t.testimonials.tag}
          </p>
          <h2
            className="mt-3 font-display text-4xl md:text-5xl max-w-2xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">{t.testimonials.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.testimonials.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 70}>
              <div className="h-full rounded-2xl bg-white border border-border p-6 soft-shadow hover:-translate-y-1 transition-all">
                <p className="text-foreground/90 leading-relaxed">“{it.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} inline-block shrink-0`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{it.name}</p>
                    <p className="text-xs text-muted-foreground">{it.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h2
            className="font-display text-4xl md:text-5xl text-center"
            style={{ letterSpacing: "-0.035em" }}
          >
            {t.faq.title}
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {t.faq.items.map((it, i) => (
            <Reveal key={it.q} delay={i * 40}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left rounded-2xl bg-white border border-border p-5 hover:border-accent-green/40 transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-base md:text-lg text-foreground">{it.q}</span>
                  <span
                    className={`text-accent-green text-xl transition-transform ${open === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </div>
                {open === i && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FINAL CTA ============ */
function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <div className="rounded-[2rem] bg-[#0F1A14] text-white p-10 md:p-16 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(rgba(22,163,74,0.6) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent 70%)",
              }}
            />
            <div className="relative">
              <h2
                className="font-display text-4xl md:text-6xl leading-[1.05]"
                style={{ letterSpacing: "-0.035em" }}
              >
                {t.finalCta.title1}
                <br />
                <span className="text-accent-green">{t.finalCta.title2}</span>
              </h2>
              <p className="mt-5 text-white/70 max-w-md mx-auto">{t.finalCta.subtitle}</p>
              <div className="mt-8 flex justify-center">
                <DemoButton size="lg">{t.hero.ctaPrimary}</DemoButton>
              </div>
              <p className="mt-4 text-xs text-white/50">{t.finalCta.caption}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-baseline gap-0.5 font-display text-lg">
          <span className="font-bold">gool</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Gool. {t.footer.copy}
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            {t.footer.privacy}
          </a>
          <a href="#" className="hover:text-foreground">
            {t.footer.terms}
          </a>
          <a href="mailto:hello@gool.app" className="hover:text-foreground">
            {t.footer.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
