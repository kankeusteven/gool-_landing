export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] md:w-[320px]">
      <div className="relative rounded-[3rem] bg-gradient-to-b from-neutral-800 to-neutral-950 p-3 shadow-2xl glow">
        <div className="overflow-hidden rounded-[2.4rem] bg-[#060806] aspect-[9/19.5] relative">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          {/* screen */}
          <div className="flex flex-col h-full p-5 pt-12 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-white/50">Bonjour, Léa</p>
                <h3 className="font-display text-xl">Tes objectifs</h3>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/40" />
            </div>

            {/* progress card */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Courir 10km</span>
                <span className="text-xs text-primary">72%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-[oklch(0.9_0.2_150)]" />
              </div>
              <p className="text-[10px] text-white/40 mt-2">Prochaine séance · Demain 7h</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Mémoire M2</span>
                <span className="text-xs text-primary">45%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-primary to-[oklch(0.9_0.2_150)]" />
              </div>
              <p className="text-[10px] text-white/40 mt-2">Étape · Plan détaillé chap. 3</p>
            </div>

            <div className="rounded-2xl bg-primary/10 border border-primary/30 p-4 mt-auto">
              <p className="text-[10px] uppercase tracking-wider text-primary mb-1">IA Coach</p>
              <p className="text-xs leading-relaxed">"Tu es en avance cette semaine. On garde le rythme ?"</p>
            </div>
          </div>
        </div>
      </div>
      {/* floating badge */}
      <div className="absolute -right-6 top-20 glass rounded-2xl px-3 py-2 animate-float-up hidden md:block">
        <p className="text-[10px] text-white/60">Streak</p>
        <p className="font-display text-lg">12 jours</p>
      </div>
      <div className="absolute -left-8 bottom-32 glass rounded-2xl px-3 py-2 animate-float-up hidden md:block">
        <p className="text-[10px] text-white/60">Rétention J30</p>
        <p className="font-display text-lg text-primary">68%</p>
      </div>
    </div>
  );
}
