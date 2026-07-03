import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { IOS_URL, LangToggle } from "@/components/landing/Nav";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
  head: () => ({
    meta: [
      { title: "gool. — Rejoins le programme bêta" },
      {
        name: "description",
        content:
          "Dis-nous qui tu es, choisis testeur interne ou externe, et télécharge gool en 2 minutes.",
      },
    ],
  }),
});

type Step = "profile" | "job" | "testerType" | "internalForm" | "externalForm" | "download";
type TesterType = "internal" | "external" | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(v: string) {
  return EMAIL_RE.test(v.trim());
}
function isValidWhatsapp(v: string) {
  return v.replace(/\D/g, "").length >= 8;
}

function DemoPage() {
  const { tDemo, lang } = useLanguage();

  const [history, setHistory] = useState<Step[]>(["profile"]);
  const step = history[history.length - 1];

  const [profile, setProfile] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [testerType, setTesterType] = useState<TesterType>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const push = (s: Step) => setHistory((h) => [...h, s]);
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));

  const jobStep = profile === "salarie" ? 1 : 0;
  const totalSteps = (testerType === "internal" ? 5 : 4) + jobStep;
  const stepNumber = Math.min(history.length, totalSteps);

  function selectProfile(key: string) {
    setProfile(key);
    setTimeout(() => push(key === "salarie" ? "job" : "testerType"), 280);
  }

  function selectJob(label: string) {
    setJob(label);
    setTimeout(() => push("testerType"), 280);
  }

  function selectTesterType(type: "internal" | "external") {
    setTesterType(type);
    setTimeout(() => push(type === "internal" ? "internalForm" : "externalForm"), 280);
  }

  function submitInternal(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !isValidEmail(email) || !isValidWhatsapp(whatsapp)) return;
    push("externalForm");
  }

  function submitExternal(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) return;
    push("download");
  }

  const showChrome = step !== "download";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-5 md:px-8 h-16 flex items-center justify-between max-w-2xl mx-auto w-full">
        <Link to="/" className="flex items-baseline gap-0.5 font-display text-xl">
          <span className="font-bold">gool</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />
        </Link>
        <div className="flex items-center gap-3">
          <LangToggle />
          {showChrome ? (
            <button
              type="button"
              onClick={back}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {tDemo.back}
            </button>
          ) : (
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {tDemo.home}
            </Link>
          )}
        </div>
      </header>

      {showChrome && (
        <div className="max-w-md mx-auto w-full px-5 md:px-0 mt-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
            <span>
              {tDemo.step} {stepNumber}/{totalSteps}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-accent-green rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-2xl">
          {step === "profile" && (
            <div key="profile" className="animate-step-in text-center">
              <h1
                className="font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {tDemo.profile.title}
              </h1>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">{tDemo.profile.subtitle}</p>
              <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                {tDemo.profile.items.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => selectProfile(p.key)}
                    className={`group rounded-2xl border p-5 transition-all soft-shadow hover:-translate-y-0.5 ${
                      profile === p.key
                        ? "border-accent-green bg-accent-green/5 ring-2 ring-accent-green/30"
                        : "border-border bg-white hover:border-accent-green/40"
                    }`}
                  >
                    <div className="text-2xl">{p.emoji}</div>
                    <h3 className="mt-3 font-display text-sm md:text-base">{p.label}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "job" && (
            <div key="job" className="animate-step-in text-center">
              <h1
                className="font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {tDemo.profile.jobsTitle}
              </h1>
              <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left max-h-[50vh] overflow-y-auto pr-1">
                {tDemo.profile.jobs.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => selectJob(label)}
                    className={`rounded-xl border p-3 text-sm transition-all soft-shadow hover:-translate-y-0.5 ${
                      job === label
                        ? "border-accent-green bg-accent-green/5 ring-2 ring-accent-green/30"
                        : "border-border bg-white hover:border-accent-green/40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "testerType" && (
            <div key="testerType" className="animate-step-in text-center">
              <h1
                className="font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {tDemo.testerType.title}
              </h1>
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">{tDemo.testerType.subtitle}</p>
              <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <button
                  type="button"
                  onClick={() => selectTesterType("internal")}
                  className={`group rounded-2xl border p-6 transition-all soft-shadow hover:-translate-y-0.5 ${
                    testerType === "internal"
                      ? "border-accent-green bg-accent-green/5 ring-2 ring-accent-green/30"
                      : "border-border bg-white hover:border-accent-green/40"
                  }`}
                >
                  <div className="text-2xl">🛠️</div>
                  <h3 className="mt-3 font-display text-lg">{tDemo.testerType.internal.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tDemo.testerType.internal.desc}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => selectTesterType("external")}
                  className={`group rounded-2xl border p-6 transition-all soft-shadow hover:-translate-y-0.5 ${
                    testerType === "external"
                      ? "border-accent-green bg-accent-green/5 ring-2 ring-accent-green/30"
                      : "border-border bg-white hover:border-accent-green/40"
                  }`}
                >
                  <div className="text-2xl">🚀</div>
                  <h3 className="mt-3 font-display text-lg">{tDemo.testerType.external.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tDemo.testerType.external.desc}
                  </p>
                </button>
              </div>
            </div>
          )}

          {step === "internalForm" && (
            <form
              key="internalForm"
              onSubmit={submitInternal}
              className="animate-step-in max-w-md mx-auto text-center"
            >
              <h1
                className="font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {tDemo.internalForm.title}
              </h1>
              <p className="mt-3 text-muted-foreground">{tDemo.internalForm.subtitle}</p>
              <div className="mt-8 space-y-4 text-left">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {tDemo.internalForm.firstName}
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {tDemo.internalForm.lastName}
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    {tDemo.internalForm.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="toi@exemple.com"
                    className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">
                    {tDemo.internalForm.whatsapp}
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={
                  !firstName.trim() || !lastName.trim() || !isValidEmail(email) || !isValidWhatsapp(whatsapp)
                }
                className="mt-8 w-full h-12 rounded-full bg-accent-green text-white font-medium hover:brightness-105 glow-green-soft transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
              >
                {tDemo.internalForm.submit}
              </button>
              <p className="mt-3 text-xs text-muted-foreground">{tDemo.internalForm.note}</p>
            </form>
          )}

          {step === "externalForm" && (
            <form
              key="externalForm"
              onSubmit={submitExternal}
              className="animate-step-in max-w-md mx-auto text-center"
            >
              <h1
                className="font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {testerType === "internal" ? tDemo.externalForm.titleInternal : tDemo.externalForm.titleExternal}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {testerType === "internal"
                  ? tDemo.externalForm.subtitleInternal
                  : tDemo.externalForm.subtitleExternal}
              </p>
              <div className="mt-8 text-left">
                <label className="text-sm font-medium text-foreground">{tDemo.externalForm.email}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="toi@exemple.com"
                  className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                />
              </div>
              <button
                type="submit"
                disabled={!isValidEmail(email)}
                className="mt-8 w-full h-12 rounded-full bg-accent-green text-white font-medium hover:brightness-105 glow-green-soft transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
              >
                {tDemo.externalForm.submit}
              </button>
            </form>
          )}

          {step === "download" && (
            <div key="download" className="animate-step-in max-w-md mx-auto text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-accent-green text-white grid place-items-center text-2xl animate-check-pop">
                ✓
              </div>
              <h1
                className="mt-6 font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {tDemo.download.title}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {testerType === "internal" ? tDemo.download.subtitleInternal : tDemo.download.subtitleExternal}
              </p>

              <a
                href={IOS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-accent-green text-white font-medium hover:brightness-105 glow-green-soft animate-pulse-glow transition"
              >
                {tDemo.download.ios} <span aria-hidden>→</span>
              </a>

              <p className="mt-5 text-xs text-muted-foreground">
                {tDemo.download.androidNote}{" "}
                <span className="text-foreground font-medium">{email || (lang === "fr" ? "ton email" : "your email")}</span>.
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5">
                💬 {tDemo.download.whatsappCommunity}
              </span>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} gool.
      </footer>
    </div>
  );
}
