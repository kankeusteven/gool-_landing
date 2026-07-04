import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IOS_URL, LangToggle, WHATSAPP_COMMUNITY_URL } from "@/components/landing/Nav";
import { Icon } from "@/components/landing/icons";
import {
  DEFAULT_COUNTRY,
  PhoneCountryInput,
  isValidPhoneForCountry,
  toE164,
  type CountryOption,
} from "@/components/landing/PhoneCountryInput";
import {
  getInternalSpotsRemaining,
  registerExternalTester,
  registerInternalTester,
} from "@/lib/api/testers.functions";
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

type Step =
  "profile" | "job" | "testerType" | "internalForm" | "externalForm" | "internalDone" | "download";
type TesterType = "internal" | "external" | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(v: string) {
  return EMAIL_RE.test(v.trim());
}

function qrUrl(data: string, size = 180) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`;
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
  const [country, setCountry] = useState<CountryOption>(DEFAULT_COUNTRY);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [spots, setSpots] = useState<{ remaining: number; total: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    getInternalSpotsRemaining()
      .then((res) => {
        if (!cancelled) setSpots(res);
      })
      .catch(() => {
        if (!cancelled) setSpots({ remaining: 92, total: 100 });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const push = (s: Step) => setHistory((h) => [...h, s]);
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));

  const jobStep = profile === "salarie" ? 1 : 0;
  const totalSteps = 3 + jobStep;
  const stepNumber = Math.min(history.length, totalSteps);

  const programFull = spots !== null && spots.remaining <= 0;

  function selectProfile(key: string) {
    setProfile(key);
    setTimeout(() => push(key === "salarie" ? "job" : "testerType"), 280);
  }

  function selectJob(label: string) {
    setJob(label);
    setTimeout(() => push("testerType"), 280);
  }

  function selectTesterType(type: "internal" | "external") {
    if (type === "internal" && programFull) return;
    setTesterType(type);
    setTouched(false);
    setSubmitError(null);
    setTimeout(() => push(type === "internal" ? "internalForm" : "externalForm"), 280);
  }

  const whatsappValid = isValidPhoneForCountry(country, whatsapp);
  const formValid =
    firstName.trim() !== "" && lastName.trim() !== "" && isValidEmail(email) && whatsappValid;

  async function submitInternal(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!formValid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await registerInternalTester({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          whatsapp: toE164(country, whatsapp),
          profile,
          job,
        },
      });
      if (!res.ok) {
        setSpots({ remaining: 0, total: 100 });
        setSubmitError(tDemo.testerType.internal.full);
        return;
      }
      setSpots((prev) => ({ remaining: res.remaining, total: prev?.total ?? 100 }));
      push("internalDone");
    } catch {
      // Fail open — never trap the user on a network hiccup.
      push("internalDone");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitExternal(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!formValid || submitting) return;
    setSubmitting(true);
    try {
      await registerExternalTester({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          whatsapp: toE164(country, whatsapp),
          profile,
          job,
        },
      });
    } catch {
      /* fail open */
    } finally {
      setSubmitting(false);
      push("download");
    }
  }

  const showChrome = step !== "internalDone" && step !== "download";

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
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
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
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                {tDemo.profile.subtitle}
              </p>
              <div className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                {tDemo.profile.items.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => selectProfile(p.key)}
                    className={`group rounded-2xl border p-5 transition-all soft-shadow hover:-translate-y-1 active:scale-[0.98] ${
                      profile === p.key
                        ? "border-accent-green bg-accent-green/5 ring-2 ring-accent-green/30"
                        : "border-border bg-white hover:border-accent-green/40"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent-green/10 grid place-items-center text-accent-green">
                      <Icon name={p.icon} className="w-4.5 h-4.5" />
                    </div>
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
                    className={`rounded-xl border p-3 text-sm transition-all soft-shadow hover:-translate-y-1 active:scale-[0.98] ${
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
              <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                {tDemo.testerType.subtitle}
              </p>
              <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <button
                  type="button"
                  onClick={() => selectTesterType("internal")}
                  disabled={programFull}
                  className={`group rounded-2xl border p-6 transition-all soft-shadow hover:-translate-y-1 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${
                    testerType === "internal"
                      ? "border-accent-green bg-accent-green/5 ring-2 ring-accent-green/30"
                      : "border-border bg-white hover:border-accent-green/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-accent-green/10 grid place-items-center text-accent-green">
                      <Icon name="tool" className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-semibold rounded-full px-2.5 py-1 transition-all ${
                        programFull
                          ? "bg-foreground/10 text-muted-foreground"
                          : "bg-accent-green/10 text-accent-green"
                      }`}
                    >
                      {programFull
                        ? tDemo.testerType.internal.full
                        : spots
                          ? `${spots.remaining} ${tDemo.testerType.internal.spotsSuffix}`
                          : "…"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg">{tDemo.testerType.internal.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tDemo.testerType.internal.desc}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => selectTesterType("external")}
                  className={`group rounded-2xl border p-6 transition-all soft-shadow hover:-translate-y-1 active:scale-[0.98] ${
                    testerType === "external"
                      ? "border-accent-green bg-accent-green/5 ring-2 ring-accent-green/30"
                      : "border-border bg-white hover:border-accent-green/40"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-green/10 grid place-items-center text-accent-green">
                    <Icon name="rocket" className="w-5 h-5" />
                  </div>
                  <h3 className="mt-3 font-display text-lg">{tDemo.testerType.external.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tDemo.testerType.external.desc}
                  </p>
                </button>
              </div>
            </div>
          )}

          {(step === "internalForm" || step === "externalForm") && (
            <form
              key={step}
              onSubmit={step === "internalForm" ? submitInternal : submitExternal}
              className="animate-step-in max-w-md mx-auto text-center"
            >
              <h1
                className="font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {step === "internalForm" ? tDemo.internalForm.title : tDemo.externalForm.title}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {step === "internalForm"
                  ? tDemo.internalForm.subtitle
                  : tDemo.externalForm.subtitle}
              </p>

              <div className="mt-8 space-y-4 text-left">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {tDemo.sharedForm.firstName}
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                    />
                    {touched && !firstName.trim() && (
                      <p className="mt-1 text-xs text-red-500">{tDemo.errors.required}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {tDemo.sharedForm.lastName}
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                    />
                    {touched && !lastName.trim() && (
                      <p className="mt-1 text-xs text-red-500">{tDemo.errors.required}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    {tDemo.sharedForm.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="toi@exemple.com"
                    className="mt-1.5 w-full h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/20 transition"
                  />
                  {touched && !isValidEmail(email) && (
                    <p className="mt-1 text-xs text-red-500">{tDemo.errors.invalidEmail}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    {tDemo.sharedForm.whatsapp}
                  </label>
                  <div className="mt-1.5">
                    <PhoneCountryInput
                      country={country}
                      onCountryChange={setCountry}
                      value={whatsapp}
                      onChange={setWhatsapp}
                      placeholder={tDemo.sharedForm.whatsappPlaceholder}
                      invalid={touched && !whatsappValid}
                    />
                  </div>
                  {touched && !whatsappValid && (
                    <p className="mt-1 text-xs text-red-500">{tDemo.errors.invalidPhone}</p>
                  )}
                </div>
              </div>

              {submitError && (
                <p className="mt-4 text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full h-12 rounded-full bg-accent-green text-white font-medium hover:brightness-105 glow-green-soft transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "…"
                  : step === "internalForm"
                    ? tDemo.internalForm.submit
                    : tDemo.externalForm.submit}
              </button>
              {step === "internalForm" && (
                <p className="mt-3 text-xs text-muted-foreground">{tDemo.internalForm.note}</p>
              )}
            </form>
          )}

          {step === "internalDone" && (
            <div key="internalDone" className="animate-step-in max-w-md mx-auto text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-accent-green text-white grid place-items-center text-2xl animate-check-pop">
                ✓
              </div>
              <h1
                className="mt-6 font-display text-3xl md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {tDemo.internalDone.title}
              </h1>
              <p className="mt-3 text-muted-foreground">{tDemo.internalDone.subtitle}</p>
            </div>
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
              <p className="mt-3 text-muted-foreground">{tDemo.download.subtitle}</p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href={IOS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-accent-green text-white font-medium hover:brightness-105 glow-green-soft animate-pulse-glow transition active:scale-[0.98]"
                >
                  {tDemo.download.ios} <span aria-hidden>→</span>
                </a>
                <div className="flex flex-col items-center gap-1.5">
                  <img
                    src={qrUrl(IOS_URL)}
                    alt={tDemo.download.qrLabel}
                    width={104}
                    height={104}
                    className="rounded-lg border border-border"
                  />
                  <p className="text-[11px] text-muted-foreground">{tDemo.download.qrLabel}</p>
                </div>
              </div>

              <p className="mt-6 text-xs text-muted-foreground">
                {tDemo.download.androidNote}{" "}
                <span className="text-foreground font-medium">
                  {email || (lang === "fr" ? "ton email" : "your email")}
                </span>
                .
              </p>

              <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-foreground border border-border rounded-full px-4 py-2 hover:border-accent-green/40 transition"
                >
                  {tDemo.download.whatsappCommunity} <span aria-hidden>→</span>
                </a>
                <div className="flex flex-col items-center gap-1.5">
                  <img
                    src={qrUrl(WHATSAPP_COMMUNITY_URL)}
                    alt={tDemo.download.whatsappQrLabel}
                    width={88}
                    height={88}
                    className="rounded-lg border border-border"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    {tDemo.download.whatsappQrLabel}
                  </p>
                </div>
              </div>
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
