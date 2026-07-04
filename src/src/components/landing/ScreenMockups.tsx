/**
 * Coded (non-image) recreations of the gool. app screens used in the phone
 * mockups across the landing page. Building these as real markup instead of
 * hosted screenshots means the landing page renders identically everywhere —
 * local dev, Lovable preview, or deployed — with zero external asset deps.
 */

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "text-white" : "text-[#0B0F0C]";
  return (
    <div
      className={`flex items-center justify-between px-6 pt-3.5 pb-1 text-[11px] font-semibold ${c}`}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span>5G</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: "home" | "feed" | "groups" | "profile" }) {
  const items = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "feed", label: "Feed", icon: "🧭" },
    { key: "plus", label: "", icon: "＋" },
    { key: "groups", label: "Groups", icon: "👥" },
    { key: "profile", label: "Profil", icon: "🙂" },
  ] as const;
  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-black/5 px-3 pt-2 pb-6 flex items-center justify-between">
      {items.map((it) =>
        it.key === "plus" ? (
          <span
            key={it.key}
            className="w-9 h-9 rounded-full bg-accent-green text-white grid place-items-center text-lg -mt-1"
          >
            {it.icon}
          </span>
        ) : (
          <div
            key={it.key}
            className={`flex flex-col items-center gap-0.5 text-[9px] ${
              it.key === active ? "text-accent-green font-semibold" : "text-[#9AA29E]"
            }`}
          >
            <span className="text-sm">{it.icon}</span>
            {it.label}
          </div>
        ),
      )}
    </div>
  );
}

function RingProgress({ pct, size = 44 }: { pct: number; size?: number }) {
  return (
    <div
      className="rounded-full grid place-items-center shrink-0"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(#16A34A ${pct * 3.6}deg, #E7E9E5 0deg)`,
      }}
    >
      <div
        className="rounded-full bg-white grid place-items-center"
        style={{ width: size - 8, height: size - 8 }}
      >
        <span className="text-[10px] font-bold text-[#0B0F0C]">{pct}%</span>
      </div>
    </div>
  );
}

/* ============ HOME ============ */
export function HomeScreen() {
  return (
    <div className="w-full h-full bg-white text-[#0B0F0C] relative font-sans">
      <StatusBar />
      <div className="px-5 pt-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#9AA29E]">jeudi 25 juin</p>
          <p className="text-[15px] font-bold mt-0.5">Bonjour Anthonio 👋</p>
        </div>
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 inline-block" />
      </div>

      <div className="mx-5 mt-4 rounded-2xl bg-[#0F1A14] text-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-wider text-accent-green">
            Check-in du jour
          </span>
          <span className="text-[10px] bg-white/10 rounded-full px-2 py-0.5">🔥 1j</span>
        </div>
        <p className="mt-2.5 text-[13px] font-semibold leading-snug">
          Calculer ton métabolisme de base et planifier 5 repas équilibrés pour la semaine
        </p>
        <p className="mt-1 text-[10px] text-white/50">Perte de 10kg en 2 mois</p>
        <div className="mt-3 flex gap-2">
          <span className="flex-1 text-center text-[11px] font-semibold rounded-full bg-accent-green py-1.5">
            ✓ Check-in
          </span>
          <span className="flex-1 text-center text-[11px] font-semibold rounded-full border border-white/15 py-1.5">
            ✦ Coach
          </span>
        </div>
      </div>

      <div className="px-5 mt-5 flex items-center justify-between">
        <p className="text-[12px] font-bold">Tes objectifs</p>
        <p className="text-[10px] text-accent-green font-semibold">Tout voir</p>
      </div>
      <div className="px-5 mt-2 grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-black/5 p-2.5 flex flex-col items-center gap-1.5 bg-white">
          <RingProgress pct={75} />
          <p className="text-[10px] font-semibold text-center leading-tight">
            Perte de 10kg en 2 mois
          </p>
          <p className="text-[9px] text-[#9AA29E]">Day 45 of 60</p>
        </div>
        <div className="rounded-xl border border-black/5 p-2.5 flex flex-col items-center gap-1.5 bg-white">
          <RingProgress pct={13} />
          <p className="text-[10px] font-semibold text-center leading-tight">Apprendre le piano</p>
          <p className="text-[9px] text-[#9AA29E]">Day 4 of 30</p>
        </div>
      </div>

      <div className="px-5 mt-5 flex items-center justify-between">
        <p className="text-[12px] font-bold">Tes groupes</p>
        <p className="text-[10px] text-accent-green font-semibold">Voir</p>
      </div>
      <div className="px-5 mt-2 flex gap-2.5">
        <span className="w-11 h-11 rounded-xl bg-[#F1F1ED] grid place-items-center text-sm">
          👥
        </span>
        <span className="w-11 h-11 rounded-xl bg-[#F1F1ED] grid place-items-center text-sm">
          👥
        </span>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

/* ============ FEED ============ */
export function FeedScreen() {
  const tiles = [
    { g: "from-emerald-400 to-teal-600", user: "Anthonio" },
    { g: "from-orange-400 to-rose-500", user: "Steven" },
    { g: "from-indigo-400 to-violet-600", user: "Anthonio" },
    { g: "from-amber-400 to-orange-600", user: "Anthonio" },
  ];
  return (
    <div className="w-full h-full bg-white text-[#0B0F0C] relative font-sans">
      <StatusBar />
      <div className="px-5 pt-3 flex items-center justify-between">
        <p className="font-display font-bold text-[16px]">gool.</p>
        <span className="text-base">🔍</span>
      </div>
      <div className="px-5 mt-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold rounded-full bg-[#0B0F0C] text-white px-3 py-1">
          For You
        </span>
        <span className="text-[11px] text-[#9AA29E] px-1">Fitness</span>
        <span className="text-[11px] text-[#9AA29E] px-1">Learning</span>
        <span className="text-[11px] text-[#9AA29E] px-1">Career</span>
      </div>
      <div className="px-4 mt-3 grid grid-cols-2 gap-2">
        {tiles.map((t, i) => (
          <div key={i} className="rounded-xl overflow-hidden relative aspect-[3/4]">
            <div className={`absolute inset-0 bg-gradient-to-br ${t.g}`} />
            <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-[9px] text-white font-medium">{t.user}</p>
              <p className="text-[9px] text-white/80">👏 12</p>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="feed" />
    </div>
  );
}

/* ============ STREAK ============ */
export function StreakScreen() {
  const days = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
  return (
    <div className="w-full h-full bg-[#0D0D0F] text-white relative font-sans flex flex-col items-center justify-center px-6">
      <StatusBar dark />
      <div className="text-5xl">🔥</div>
      <p className="mt-2 text-5xl font-display font-bold">2</p>
      <p className="mt-1 text-sm text-white/70">Day Streak !</p>
      <span className="mt-3 text-[11px] font-semibold rounded-full bg-accent-green px-3 py-1">
        +10 XP
      </span>

      <div className="mt-6 flex gap-1.5">
        {days.map((d) => (
          <div key={d} className="flex flex-col items-center gap-1">
            <span className="text-[9px] text-white/40">{d}</span>
            <span className="w-6 h-6 rounded-full bg-[#F59E0B] text-[10px] grid place-items-center">
              ✓
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[11px] text-white/60 text-center leading-relaxed max-w-[220px]">
        Tu sais ce qui sépare ceux qui réussissent ? Exactement ce que tu fais là. Jour après jour.
      </p>

      <span className="mt-6 text-[11px] font-semibold rounded-full bg-accent-green px-4 py-2">
        Voir le classement →
      </span>
    </div>
  );
}

/* ============ POST DETAIL ============ */
export function PostScreen() {
  return (
    <div className="w-full h-full bg-white text-[#0B0F0C] relative font-sans">
      <StatusBar />
      <div className="px-5 pt-3 flex items-center gap-3">
        <span className="text-base">←</span>
        <p className="text-[13px] font-bold">Post</p>
      </div>

      <div className="mx-5 mt-3 rounded-2xl overflow-hidden relative aspect-[4/5]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-[#0F1A14]" />
        <span className="absolute top-2.5 left-2.5 text-[9px] font-semibold bg-black/40 text-white rounded-full px-2 py-1">
          🎯 Perte de 10kg
        </span>
      </div>

      <div className="px-5 mt-3 flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 inline-block" />
        <p className="text-[11px] font-semibold">Anthonio</p>
        <span className="text-[10px] text-[#9AA29E]">🔥 45 jours</span>
      </div>
      <p className="px-5 mt-2 text-[11px] text-[#5B6360] leading-relaxed">
        Jour 45. Toujours là. Le plus dur c'est de commencer — le reste, c'est juste continuer.
      </p>

      <div className="px-5 mt-3 flex items-center gap-4 text-[11px] text-[#5B6360]">
        <span>👏 42</span>
        <span>❤️ 18</span>
        <span>💬 5</span>
        <span className="ml-auto text-accent-green font-semibold">Partager</span>
      </div>

      <div className="px-5 mt-3 flex items-start gap-2">
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 inline-block shrink-0" />
        <p className="text-[10px] text-[#5B6360]">
          <span className="font-semibold text-[#0B0F0C]">Steven</span> t'es une machine 🔥
        </p>
      </div>
    </div>
  );
}
