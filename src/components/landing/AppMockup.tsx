export function AppMockup() {
  return (
    <div className="relative rounded-2xl bg-[#0A0A0D] border border-white/10 shadow-2xl overflow-hidden glow-green">
      {/* window bar */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-white/5 bg-[#08080B]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-4 text-[11px] text-muted-foreground font-mono">gool.app</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 md:p-5">
        {/* Col 1 - Objectif IA */}
        <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">🎯 Objectif IA</p>
          <h4 className="font-display text-base mb-3">Apprendre l'espagnol</h4>
          <div className="flex items-center justify-between mb-1.5 text-[11px]">
            <span className="text-muted-foreground">Progression</span>
            <span className="text-accent-green font-semibold">82%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden mb-4">
            <div className="h-full bg-accent-green rounded-full" style={{ width: "82%" }} />
          </div>
          <ul className="space-y-2 text-xs">
            {[
              { d: "Vocabulaire B1", c: true },
              { d: "10 min Duolingo/jour", c: true },
              { d: "Conversation week-end", c: false },
              { d: "Série en VO", c: false },
            ].map((t) => (
              <li key={t.d} className="flex items-center gap-2">
                <span
                  className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center text-[9px] ${
                    t.c
                      ? "bg-accent-green border-accent-green text-[#0D0D0F]"
                      : "border-white/15 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className={t.c ? "text-muted-foreground line-through" : "text-foreground"}>
                  {t.d}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2 - Aujourd'hui */}
        <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">📅 Aujourd'hui</p>
          <div className="space-y-2.5">
            {[
              { t: "12h30", l: "Session vocab — 20 min" },
              { t: "19h00", l: "Run 5km — Marathon" },
              { t: "21h00", l: "Lecture chap. 3" },
            ].map((e) => (
              <div
                key={e.t}
                className="rounded-lg border border-accent-green/20 bg-accent-green/[0.06] p-2.5"
              >
                <div className="text-[11px] text-accent-green font-mono">{e.t}</div>
                <div className="text-xs mt-0.5">{e.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground">Synchronisé avec Google Calendar</div>
        </div>

        {/* Col 3 - Equipe */}
        <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4 flex flex-col">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">👥 Équipe</p>
          <ul className="space-y-2.5 text-xs">
            {[
              { n: "Léa", s: "✓ Fait", ok: true, c: "bg-[#7C3AED]" },
              { n: "Tom", s: "En retard", ok: false, c: "bg-[#F59E0B]" },
              { n: "Sara", s: "✓ Fait", ok: true, c: "bg-[#3B82F6]" },
            ].map((m) => (
              <li key={m.n} className="flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-full ${m.c} grid place-items-center text-[10px] font-bold`}>
                  {m.n[0]}
                </span>
                <span className="flex-1">{m.n}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    m.ok
                      ? "bg-accent-green/15 text-accent-green"
                      : "bg-[#F59E0B]/15 text-[#F59E0B]"
                  }`}
                >
                  {m.s}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4">
            <div className="rounded-lg border border-accent-green/25 bg-accent-green/[0.06] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-accent-green mb-1">✦ Gool IA</p>
              <p className="text-[11px] leading-relaxed">Tom est en retard de 2j. Je lui envoie un nudge ?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
