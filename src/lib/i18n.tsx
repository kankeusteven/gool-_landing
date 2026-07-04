import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

/* ============================================================
   Landing page dictionary
   ============================================================ */
export interface LandingDict {
  nav: {
    features: string;
    how: string;
    faq: string;
    cta: string;
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    freemium: string;
    caption: string;
  };
  video: {
    tag: string;
    title: string;
    subtitle: string;
    playLabel: string;
    placeholder: string;
  };
  pillars: {
    tag: string;
    title: string;
    subtitle: string;
    items: { icon: string; t: string; d: string }[];
  };
  how: {
    tag: string;
    title: string;
    steps: { n: string; t: string; d: string }[];
  };
  features: {
    rows: {
      tag: string;
      title: string;
      caption: string;
    }[];
    quote: string;
    quoteFooter: string;
  };
  loop: {
    tag: string;
    title: string;
    subtitle: string;
    steps: { t: string; d: string; icon: string; label: string }[];
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
    items: { name: string; role: string; quote: string }[];
  };
  stats: {
    items: { value: number; suffix: string; label: string }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    title1: string;
    title2: string;
    subtitle: string;
    caption: string;
  };
  footer: {
    copy: string;
    privacy: string;
    terms: string;
    contact: string;
  };
}

/* ============================================================
   Demo flow dictionary
   ============================================================ */
export interface DemoDict {
  back: string;
  home: string;
  step: string;
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
  };
  profile: {
    step: string;
    title: string;
    subtitle: string;
    items: { key: string; icon: string; label: string }[];
    jobsTitle: string;
    jobs: string[];
  };
  testerType: {
    step: string;
    title: string;
    subtitle: string;
    internal: { title: string; desc: string; spotsSuffix: string; full: string };
    external: { title: string; desc: string };
  };
  sharedForm: {
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    whatsappPlaceholder: string;
  };
  internalForm: {
    title: string;
    subtitle: string;
    submit: string;
    note: string;
  };
  externalForm: {
    title: string;
    subtitle: string;
    submit: string;
  };
  internalDone: {
    title: string;
    subtitle: string;
    whatsappCommunity: string;
  };
  download: {
    title: string;
    subtitle: string;
    ios: string;
    qrLabel: string;
    androidNote: string;
    whatsappCommunity: string;
    whatsappQrLabel: string;
  };
}

/* ============================================================
   FR
   ============================================================ */
const fr: LandingDict = {
  nav: { features: "Fonctionnalités", how: "Comment ça marche", faq: "FAQ", cta: "Essayer gool" },
  hero: {
    title1: "Atteins enfin",
    title2: "tes objectifs.",
    subtitle:
      "Anthonio suit sa perte de poids depuis 44 jours. Steven apprend une nouvelle langue. Manoel a lancé les mises à jour sur le projet JNUAF. Ils ont tous commencé par déclarer un objectif dans Gool.",
    ctaPrimary: "Essayer gool",
    ctaSecondary: "Voir la démonstration",
    freemium: "Gratuit · Aucune carte requise · iOS & Android",
    caption: "Captures d'écran réelles de l'app · iOS & Android",
  },
  video: {
    tag: "30 secondes chrono",
    title: "Découvre gool en 30 secondes.",
    subtitle: "La vidéo qui explique tout : coach IA, streaks, groupes et feed — en 30 secondes.",
    playLabel: "Lire la vidéo de présentation de gool",
    placeholder: "Vidéo de présentation — bientôt disponible",
  },
  pillars: {
    tag: "5 piliers",
    title: "Tout ce qu'il te faut, dans une seule app.",
    subtitle:
      "92% des gens abandonnent leurs objectifs avant 3 mois. Gool combine les 5 leviers qui changent vraiment la donne.",
    items: [
      {
        icon: "target",
        t: "Coach IA personnalisé",
        d: "Définis ton objectif, l'IA génère ton plan jour par jour.",
      },
      {
        icon: "flame",
        t: "Streaks gamifiés",
        d: "Check-in en 1 tap, 10 secondes. Tu reviens chaque jour.",
      },
      {
        icon: "trophy",
        t: "Classement XP",
        d: "Chaque action gagne des XP. Tu vois ton rang grimper.",
      },
      {
        icon: "users",
        t: "Groupes d'accountability",
        d: "Publics, privés ou projets. Chat temps réel, tâches assignées.",
      },
      {
        icon: "feed",
        t: "Feed social",
        d: "Partage tes victoires en photo/vidéo, réagis, commente.",
      },
      {
        icon: "loop",
        t: "Boucle d'habitude",
        d: "Trigger → action → récompense → investissement.",
      },
    ],
  },
  how: {
    tag: "Comment ça marche",
    title: "De l'idée au résultat, en 6 étapes.",
    steps: [
      {
        n: "01",
        t: "Tu définis ton objectif",
        d: "« Perdre 10kg », « Apprendre l'espagnol ». En une phrase.",
      },
      {
        n: "02",
        t: "Le coach IA construit ton plan",
        d: "Décomposition en check-ins quotidiens, calée sur ton rythme et ta vie.",
      },
      {
        n: "03",
        t: "Tu avances chaque jour",
        d: "10 secondes, 1 tap. Un check-in, chaque jour compte.",
      },
      {
        n: "04",
        t: "Tu suis ta progression",
        d: "Cercles de progression, streaks et XP pour voir le chemin parcouru.",
      },
      {
        n: "05",
        t: "Tu rejoins une communauté",
        d: "Groupes, feed et accountability pour ne jamais lâcher seul.",
      },
      {
        n: "06",
        t: "Tu atteins ton objectif",
        d: "Le vrai résultat : l'objectif que tu t'étais fixé, atteint.",
      },
    ],
  },
  features: {
    rows: [
      {
        tag: "Coach IA",
        title: "Ton coach, disponible à tout moment.",
        caption: "Un plan personnalisé, ajusté en discutant avec ton coach IA.",
      },
      {
        tag: "Objectifs",
        title: "Un check-in. Une journée gagnée.",
        caption: "Tes objectifs, leur progression, ton check-in du jour — en un coup d'œil.",
      },
      {
        tag: "Streaks",
        title: "L'habitude qui se construit toute seule.",
        caption: "Chaque jour compte. Ta série grandit, ta motivation aussi.",
      },
      {
        tag: "Classement",
        title: "Chaque action gagne des XP.",
        caption: "Tu vois ton rang grimper parmi la communauté gool.",
      },
      {
        tag: "Groupes",
        title: "L'accountability change tout.",
        caption: "Des groupes réels, des tâches assignées, une pression sociale positive.",
      },
      {
        tag: "Feed",
        title: "Tes victoires, vues par les bonnes personnes.",
        caption: "Partage tes avancées, inspire-toi de celles des autres.",
      },
    ],
    quote:
      "« Tu sais ce qui sépare ceux qui réussissent ? Exactement ce que tu fais là. Jour après jour. »",
    quoteFooter: "— message reçu après 2 jours de streak",
  },
  loop: {
    tag: "La boucle",
    title: "Pourquoi tu reviens chaque jour, sans y penser.",
    subtitle:
      "Le modèle Hooked, appliqué à tes objectifs. Quatre étapes qui font la différence entre une app que tu télécharges et une app qui change ta vie.",
    steps: [
      {
        t: "Trigger",
        label: "Étape 1",
        d: "Notification : « Ton streak est en danger »",
        icon: "bell",
      },
      { t: "Action", label: "Étape 2", d: "Check-in en 1 tap. 10 secondes.", icon: "tap" },
      {
        t: "Reward",
        label: "Étape 3",
        d: "Message coach + badge + classement qui change.",
        icon: "reward",
      },
      {
        t: "Investment",
        label: "Étape 4",
        d: "Streak + XP + followers = coût d'abandon élevé.",
        icon: "invest",
      },
    ],
  },
  testimonials: {
    tag: "Témoignages",
    title: "Ce que disent nos premiers testeurs.",
    subtitle: "Des profils types de la bêta, pour donner une idée concrète de l'expérience gool.",
    items: [
      {
        name: "Anthonio",
        role: "Perte de poids · -10kg en 2 mois",
        quote:
          "Le coach IA me redonne un plan clair chaque matin. Je n'ai plus besoin de réfléchir, juste d'avancer.",
      },
      {
        name: "Steven",
        role: "Apprentissage d'une langue",
        quote:
          "Les streaks m'ont totalement changé. Je n'ai pas raté un seul jour depuis 3 semaines.",
      },
      {
        name: "Manoel",
        role: "Projet JNUAF",
        quote:
          "Le groupe d'accountability, c'est ce qui m'a fait tenir sur la durée. On ne lâche pas seul.",
      },
    ],
  },
  stats: {
    items: [
      { value: 1349, suffix: "", label: "Utilisateurs actifs" },
      { value: 8200, suffix: "+", label: "Objectifs réalisés" },
      { value: 640, suffix: "", label: "Retours reçus" },
    ],
  },
  faq: {
    title: "Questions fréquentes.",
    items: [
      {
        q: "Gool est gratuit ?",
        a: "Oui, totalement. La beta est ouverte sans carte bancaire. Tu accèdes à toutes les fonctionnalités : coach IA, streaks, groupes et feed.",
      },
      {
        q: "Comment fonctionne le coach IA ?",
        a: "Tu déclares ton objectif en une phrase. L'IA génère un plan d'action jour par jour. Tu peux discuter avec elle pour ajuster, demander conseil ou te remotiver à tout moment.",
      },
      {
        q: "C'est différent de Notion ou Todoist ?",
        a: "Oui. Gool n'est pas une to-do list — c'est un système combinant coach IA, accountability sociale et gamification. L'objectif n'est pas de cocher des cases, c'est d'atteindre tes objectifs.",
      },
      {
        q: "Mes données sont-elles privées ?",
        a: "Oui. Tu choisis ce qui est public (posts, groupes ouverts) et ce qui reste privé. Aucune donnée n'est vendue. L'IA tourne sur une infrastructure sécurisée.",
      },
      {
        q: "Sur quelles plateformes Gool est disponible ?",
        a: "iOS, Android et bientôt Web. Synchronisation en temps réel sur tous tes appareils.",
      },
    ],
  },
  finalCta: {
    title1: "Arrête de planifier.",
    title2: "Commence à finir.",
    subtitle:
      "Rejoins les 1 349 personnes qui ne ratent plus un objectif depuis qu'elles utilisent Gool.",
    caption: "Gratuit · Sans carte · 60 secondes pour commencer",
  },
  footer: {
    copy: "Atteins enfin tes objectifs.",
    privacy: "Confidentialité",
    terms: "Conditions",
    contact: "Contact",
  },
};

/* ============================================================
   EN
   ============================================================ */
const en: LandingDict = {
  nav: { features: "Features", how: "How it works", faq: "FAQ", cta: "Try gool" },
  hero: {
    title1: "Finally reach",
    title2: "your goals.",
    subtitle:
      "Anthonio has been tracking his weight loss for 44 days. Steven is learning a new language. Manoel is shipping updates on the JNUAF project. They all started by setting a goal in Gool.",
    ctaPrimary: "Try gool",
    ctaSecondary: "Watch the demo",
    freemium: "Free · No card required · iOS & Android",
    caption: "Real screenshots from the app · iOS & Android",
  },
  video: {
    tag: "30 seconds, tops",
    title: "See gool in 30 seconds.",
    subtitle: "The video that explains it all: AI coach, streaks, groups and feed — in 30 seconds.",
    playLabel: "Play the gool product video",
    placeholder: "Product video — coming soon",
  },
  pillars: {
    tag: "5 pillars",
    title: "Everything you need, in one app.",
    subtitle:
      "92% of people abandon their goals before month 3. Gool combines the 5 levers that actually change that.",
    items: [
      {
        icon: "target",
        t: "Personalized AI coach",
        d: "Set your goal, the AI builds your day-by-day plan.",
      },
      {
        icon: "flame",
        t: "Gamified streaks",
        d: "1-tap check-in, 10 seconds. You come back every day.",
      },
      { icon: "trophy", t: "XP leaderboard", d: "Every action earns XP. Watch your rank climb." },
      {
        icon: "users",
        t: "Accountability groups",
        d: "Public, private or project-based. Real-time chat, assigned tasks.",
      },
      { icon: "feed", t: "Social feed", d: "Share your wins in photo or video, react, comment." },
      { icon: "loop", t: "Habit loop", d: "Trigger → action → reward → investment." },
    ],
  },
  how: {
    tag: "How it works",
    title: "From idea to result, in 6 steps.",
    steps: [
      { n: "01", t: "You set your goal", d: "“Lose 10kg”, “Learn Spanish”. In one sentence." },
      {
        n: "02",
        t: "The AI coach builds your plan",
        d: "Broken down into daily check-ins, matched to your pace and your life.",
      },
      {
        n: "03",
        t: "You show up every day",
        d: "10 seconds, 1 tap. One check-in, every day counts.",
      },
      {
        n: "04",
        t: "You track your progress",
        d: "Progress rings, streaks and XP to see how far you've come.",
      },
      {
        n: "05",
        t: "You join a community",
        d: "Groups, feed and accountability so you never quit alone.",
      },
      {
        n: "06",
        t: "You reach your goal",
        d: "The real result: the goal you set for yourself, achieved.",
      },
    ],
  },
  features: {
    rows: [
      {
        tag: "AI coach",
        title: "Your coach, available anytime.",
        caption: "A personalized plan, adjusted by chatting with your AI coach.",
      },
      {
        tag: "Goals",
        title: "One check-in. One day won.",
        caption: "Your goals, their progress, today's check-in — at a glance.",
      },
      {
        tag: "Streaks",
        title: "The habit that builds itself.",
        caption: "Every day counts. Your streak grows, so does your motivation.",
      },
      {
        tag: "Leaderboard",
        title: "Every action earns XP.",
        caption: "Watch your rank climb among the gool community.",
      },
      {
        tag: "Groups",
        title: "Accountability changes everything.",
        caption: "Real groups, assigned tasks, positive social pressure.",
      },
      {
        tag: "Feed",
        title: "Your wins, seen by the right people.",
        caption: "Share your progress, get inspired by others.",
      },
    ],
    quote:
      "“You know what separates people who succeed? Exactly what you're doing right now. Day after day.”",
    quoteFooter: "— message received after a 2-day streak",
  },
  loop: {
    tag: "The loop",
    title: "Why you come back every day, without thinking.",
    subtitle:
      "The Hooked model, applied to your goals. Four steps that make the difference between an app you download and an app that changes your life.",
    steps: [
      { t: "Trigger", label: "Step 1", d: "Notification: “Your streak is at risk”", icon: "bell" },
      { t: "Action", label: "Step 2", d: "1-tap check-in. 10 seconds.", icon: "tap" },
      {
        t: "Reward",
        label: "Step 3",
        d: "Coach message + badge + a leaderboard that moves.",
        icon: "reward",
      },
      {
        t: "Investment",
        label: "Step 4",
        d: "Streak + XP + followers = high cost of quitting.",
        icon: "invest",
      },
    ],
  },
  testimonials: {
    tag: "Testimonials",
    title: "What our early testers say.",
    subtitle: "Typical beta profiles, to give you a concrete sense of the gool experience.",
    items: [
      {
        name: "Anthonio",
        role: "Weight loss · -10kg in 2 months",
        quote:
          "The AI coach gives me a clear plan every morning. I don't have to think anymore, just show up.",
      },
      {
        name: "Steven",
        role: "Learning a new language",
        quote:
          "Streaks completely changed things for me. I haven't missed a single day in 3 weeks.",
      },
      {
        name: "Manoel",
        role: "JNUAF project",
        quote: "The accountability group is what kept me going. You never quit alone.",
      },
    ],
  },
  stats: {
    items: [
      { value: 1349, suffix: "", label: "Active users" },
      { value: 8200, suffix: "+", label: "Goals completed" },
      { value: 640, suffix: "", label: "Feedback received" },
    ],
  },
  faq: {
    title: "Frequently asked questions.",
    items: [
      {
        q: "Is Gool free?",
        a: "Yes, completely. The beta is open with no credit card. You get access to every feature: AI coach, streaks, groups and feed.",
      },
      {
        q: "How does the AI coach work?",
        a: "You state your goal in one sentence. The AI generates a day-by-day action plan. You can chat with it to adjust, ask for advice, or get motivated anytime.",
      },
      {
        q: "Is it different from Notion or Todoist?",
        a: "Yes. Gool isn't a to-do list — it's a system combining an AI coach, social accountability and gamification. The point isn't to check boxes, it's to reach your goals.",
      },
      {
        q: "Is my data private?",
        a: "Yes. You choose what's public (posts, open groups) and what stays private. No data is ever sold. The AI runs on secure infrastructure.",
      },
      {
        q: "Which platforms is Gool available on?",
        a: "iOS, Android and Web soon. Real-time sync across all your devices.",
      },
    ],
  },
  finalCta: {
    title1: "Stop planning.",
    title2: "Start finishing.",
    subtitle: "Join the 1,349 people who no longer miss a goal since they started using Gool.",
    caption: "Free · No card · 60 seconds to get started",
  },
  footer: {
    copy: "Finally reach your goals.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
  },
};

/* ============================================================
   Demo flow — FR
   ============================================================ */
const demoFr: DemoDict = {
  back: "← Retour",
  home: "← Accueil",
  step: "Étape",
  errors: {
    required: "Ce champ est requis.",
    invalidEmail: "Adresse email invalide.",
    invalidPhone: "Numéro invalide pour ce pays.",
  },
  profile: {
    step: "Étape 1",
    title: "Parlez-nous un peu de vous.",
    subtitle: "Ça nous aide à comprendre ton métier et à te proposer la bonne expérience gool.",
    items: [
      { key: "etudiant", icon: "student", label: "Étudiant" },
      { key: "salarie", icon: "employee", label: "Salarié(e)" },
      { key: "freelance", icon: "freelance", label: "Freelance" },
      { key: "entrepreneur", icon: "rocket", label: "Entrepreneur" },
      { key: "recherche", icon: "search", label: "En recherche d'emploi" },
      { key: "autre", icon: "other", label: "Autre" },
    ],
    jobsTitle: "Quel est ton métier ?",
    jobs: [
      "Ingénieur logiciel",
      "Data Scientist",
      "Chef de projet",
      "Product Manager",
      "UX Designer",
      "Développeur",
      "RH",
      "Commercial",
      "Consultant",
      "Comptable",
      "Juriste",
      "Marketing",
      "Finance",
      "Enseignant",
      "Médecin",
      "Infirmier",
      "Autre",
    ],
  },
  testerType: {
    step: "Étape 2",
    title: "Testeur interne ou externe ?",
    subtitle: "Les deux te donnent accès à gool. La différence, c'est ton implication.",
    internal: {
      title: "Testeur interne",
      desc: "Tu façonnes gool avec nous : retours directs à l'équipe, et accès à une version plus complète et plus rapide que le public.",
      spotsSuffix: "places restantes sur 100",
      full: "Programme complet",
    },
    external: {
      title: "Testeur externe",
      desc: "Tu essaies la version bêta publique de gool. Rapide et simple, en 2 minutes.",
    },
  },
  sharedForm: {
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse email",
    whatsapp: "Numéro WhatsApp",
    whatsappPlaceholder: "6 12 34 56 78",
  },
  internalForm: {
    title: "Encore quelques infos.",
    subtitle: "Pour rejoindre le programme testeur interne, on a besoin de te contacter.",
    submit: "Continuer →",
    note: "On t'écrira sur WhatsApp pour t'accueillir dans le programme testeur interne.",
  },
  externalForm: {
    title: "Presque prêt.",
    subtitle: "Pour recevoir ton accès à la bêta gool.",
    submit: "Continuer →",
  },
  internalDone: {
    title: "Merci de rejoindre gool.",
    subtitle:
      "Bienvenue parmi les testeurs internes. Notre équipe te contactera prochainement sur WhatsApp pour t'intégrer au programme.",
    whatsappCommunity: "Rejoindre notre communauté WhatsApp",
  },
  download: {
    title: "Merci de rejoindre gool.",
    subtitle:
      "Clique sur le lien ci-dessous, ou scanne le QR code, pour télécharger gool sur TestFlight.",
    ios: "Télécharger via TestFlight",
    qrLabel: "Scanne pour télécharger",
    androidNote: "Version Android bientôt disponible — on te préviendra à",
    whatsappCommunity: "Rejoindre notre communauté WhatsApp",
    whatsappQrLabel: "Scanne pour rejoindre",
  },
};

/* ============================================================
   Demo flow — EN
   ============================================================ */
const demoEn: DemoDict = {
  back: "← Back",
  home: "← Home",
  step: "Step",
  errors: {
    required: "This field is required.",
    invalidEmail: "Invalid email address.",
    invalidPhone: "Invalid number for this country.",
  },
  profile: {
    step: "Step 1",
    title: "Tell us a bit about yourself.",
    subtitle: "This helps us understand your job and offer you the right gool experience.",
    items: [
      { key: "etudiant", icon: "student", label: "Student" },
      { key: "salarie", icon: "employee", label: "Employee" },
      { key: "freelance", icon: "freelance", label: "Freelancer" },
      { key: "entrepreneur", icon: "rocket", label: "Entrepreneur" },
      { key: "recherche", icon: "search", label: "Job seeker" },
      { key: "autre", icon: "other", label: "Other" },
    ],
    jobsTitle: "What's your job?",
    jobs: [
      "Software Engineer",
      "Data Scientist",
      "Project Manager",
      "Product Manager",
      "UX Designer",
      "Developer",
      "HR",
      "Sales",
      "Consultant",
      "Accountant",
      "Lawyer",
      "Marketing",
      "Finance",
      "Teacher",
      "Doctor",
      "Nurse",
      "Other",
    ],
  },
  testerType: {
    step: "Step 2",
    title: "Internal or external tester?",
    subtitle: "Both give you access to gool. The difference is how involved you are.",
    internal: {
      title: "Internal tester",
      desc: "You help shape gool with us: direct feedback to the team, and access to a more complete, faster version than the public.",
      spotsSuffix: "spots left out of 100",
      full: "Program full",
    },
    external: {
      title: "External tester",
      desc: "You try the public beta version of gool. Fast and simple, in 2 minutes.",
    },
  },
  sharedForm: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    whatsapp: "WhatsApp number",
    whatsappPlaceholder: "6 12 34 56 78",
  },
  internalForm: {
    title: "Just a few more details.",
    subtitle: "To join the internal tester program, we need a way to reach you.",
    submit: "Continue →",
    note: "We'll message you on WhatsApp to welcome you into the internal tester program.",
  },
  externalForm: {
    title: "Almost there.",
    subtitle: "To receive your access to the gool beta.",
    submit: "Continue →",
  },
  internalDone: {
    title: "Thanks for joining gool.",
    subtitle:
      "Welcome aboard as an internal tester. Our team will reach out on WhatsApp soon to bring you into the program.",
    whatsappCommunity: "Join our WhatsApp community",
  },
  download: {
    title: "Thanks for joining gool.",
    subtitle: "Click the link below, or scan the QR code, to download gool on TestFlight.",
    ios: "Download via TestFlight",
    qrLabel: "Scan to download",
    androidNote: "Android version coming soon — we'll notify you at",
    whatsappCommunity: "Join our WhatsApp community",
    whatsappQrLabel: "Scan to join",
  },
};

const dictionaries: Record<Lang, { landing: LandingDict; demo: DemoDict }> = {
  fr: { landing: fr, demo: demoFr },
  en: { landing: en, demo: demoEn },
};

/* ============================================================
   Context / provider / hook
   ============================================================ */
interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: LandingDict;
  tDemo: DemoDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "gool-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {
      /* ignore (SSR / storage disabled) */
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === "fr" ? "en" : "fr"),
      t: dictionaries[lang].landing,
      tDemo: dictionaries[lang].demo,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
