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
    items: { e: string; t: string; d: string }[];
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
      body: string;
      bullets: string[];
    }[];
    quote: string;
    quoteFooter: string;
  };
  loop: {
    tag: string;
    title: string;
    subtitle: string;
    steps: { t: string; d: string; e: string; label: string }[];
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
    items: { name: string; role: string; quote: string }[];
  };
  roadmap: {
    tag: string;
    title: string;
    subtitle: string;
    items: { status: string; t: string; d: string }[];
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
  profile: {
    step: string;
    title: string;
    subtitle: string;
    items: { key: string; emoji: string; label: string }[];
    jobsTitle: string;
    jobs: string[];
  };
  testerType: {
    step: string;
    title: string;
    subtitle: string;
    internal: { title: string; desc: string };
    external: { title: string; desc: string };
  };
  internalForm: {
    step: string;
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    submit: string;
    note: string;
  };
  externalForm: {
    stepInternal: string;
    stepExternal: string;
    titleInternal: string;
    titleExternal: string;
    subtitleInternal: string;
    subtitleExternal: string;
    email: string;
    submit: string;
  };
  download: {
    title: string;
    subtitleInternal: string;
    subtitleExternal: string;
    ios: string;
    androidNote: string;
    whatsappCommunity: string;
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
    title: "Découvre gool en moins d'une minute.",
    subtitle: "La vidéo qui explique tout : coach IA, streaks, groupes et feed — en une minute.",
    playLabel: "Lire la vidéo de présentation de gool",
    placeholder: "Vidéo de présentation — bientôt disponible",
  },
  pillars: {
    tag: "5 piliers",
    title: "Tout ce qu'il te faut, dans une seule app.",
    subtitle:
      "92% des gens abandonnent leurs objectifs avant 3 mois. Gool combine les 5 leviers qui changent vraiment la donne.",
    items: [
      { e: "🎯", t: "Coach IA personnalisé", d: "Définis ton objectif, l'IA génère ton plan jour par jour. Discute, ajuste, remotive-toi à tout moment." },
      { e: "🔥", t: "Streaks gamifiés", d: "Check-in en 1 tap, 10 secondes. Streaks, badges et messages aléatoires : tu reviens chaque jour." },
      { e: "🏆", t: "Classement XP", d: "Chaque action gagne des XP. Tu vois ton rang grimper et tu te dépasses sans t'en rendre compte." },
      { e: "👥", t: "Groupes d'accountability", d: "Publics, privés ou projets. Chat temps réel, tâches assignées, pression sociale positive." },
      { e: "📰", t: "Feed social", d: "Partage tes victoires en photo/vidéo, réagis, commente. Inspire et inspire-toi des autres." },
      { e: "✦", t: "Boucle d'habitude", d: "Trigger → action → récompense → investissement. Le modèle Hooked au service de tes objectifs." },
    ],
  },
  how: {
    tag: "Comment ça marche",
    title: "De l'idée au résultat, en 6 étapes.",
    steps: [
      { n: "01", t: "Tu définis ton objectif", d: "« Perdre 10kg », « Apprendre l'espagnol ». En une phrase." },
      { n: "02", t: "Le coach IA construit ton plan", d: "Décomposition en check-ins quotidiens, calée sur ton rythme et ta vie." },
      { n: "03", t: "Tu avances chaque jour", d: "10 secondes, 1 tap. Un check-in, chaque jour compte." },
      { n: "04", t: "Tu suis ta progression", d: "Cercles de progression, streaks et XP pour voir le chemin parcouru." },
      { n: "05", t: "Tu rejoins une communauté", d: "Groupes, feed et accountability pour ne jamais lâcher seul." },
      { n: "06", t: "Tu atteins ton objectif", d: "Le vrai résultat : l'objectif que tu t'étais fixé, atteint." },
    ],
  },
  features: {
    rows: [
      {
        tag: "Suivi quotidien",
        title: "Un check-in. Une journée gagnée.",
        body: "Chaque matin, ton objectif se transforme en une action concrète. Pas une to-do interminable — une seule chose, choisie pour toi par le coach IA.",
        bullets: [
          "Plan d'action personnalisé en 60 secondes",
          "Cercles de progression pour chaque objectif",
          "Réajustement automatique si tu loupes 2 jours",
        ],
      },
      {
        tag: "Communauté",
        title: "L'accountability change tout.",
        body: "Rejoins un feed alimenté par des vrais utilisateurs qui partagent leurs avancées en vidéo. Voir les autres avancer, c'est le moteur le plus puissant.",
        bullets: [
          "Feed For You / Fitness / Learning / Career",
          "Posts en vidéo et photo, comme un mini-réseau",
          "Groupes publics, privés ou de projet",
        ],
      },
      {
        tag: "Streak & motivation",
        title: "L'habitude qui se construit toute seule.",
        body: "Streaks visuels, XP et classement transforment tes objectifs en jeu. Tu ne veux plus casser ta série.",
        bullets: [
          "Streaks visuels style Duolingo",
          "+10 XP à chaque check-in",
          "Classement et badges 🔥 💎 👑",
        ],
      },
      {
        tag: "Partage de progrès",
        title: "Tes victoires, vues par les bonnes personnes.",
        body: "Chaque post est rattaché à un objectif. Pas de like vide : des 👏 qui veulent dire quelque chose, des commentaires qui te poussent à continuer.",
        bullets: [
          "Post lié à un objectif (ex. « Perte de 10kg »)",
          "Réactions 👏, ❤️, commentaires, partage",
          "Profil public avec ton streak et tes wins",
        ],
      },
    ],
    quote: "« Tu sais ce qui sépare ceux qui réussissent ? Exactement ce que tu fais là. Jour après jour. »",
    quoteFooter: "— message reçu après 2 jours de streak",
  },
  loop: {
    tag: "La boucle",
    title: "Pourquoi tu reviens chaque jour, sans y penser.",
    subtitle: "Le modèle Hooked, appliqué à tes objectifs. Quatre étapes qui font la différence entre une app que tu télécharges et une app qui change ta vie.",
    steps: [
      { t: "Trigger", label: "Étape 1", d: "Notification : « Ton streak est en danger »", e: "🔔" },
      { t: "Action", label: "Étape 2", d: "Check-in en 1 tap. 10 secondes.", e: "👆" },
      { t: "Reward", label: "Étape 3", d: "Message coach + badge + classement qui change.", e: "✨" },
      { t: "Investment", label: "Étape 4", d: "Streak + XP + followers = coût d'abandon élevé.", e: "💎" },
    ],
  },
  testimonials: {
    tag: "Témoignages",
    title: "Ce que disent nos premiers testeurs.",
    subtitle: "Des profils types de la bêta, pour donner une idée concrète de l'expérience gool.",
    items: [
      { name: "Anthonio", role: "Perte de poids · -10kg en 2 mois", quote: "Le coach IA me redonne un plan clair chaque matin. Je n'ai plus besoin de réfléchir, juste d'avancer." },
      { name: "Steven", role: "Apprentissage d'une langue", quote: "Les streaks m'ont totalement changé. Je n'ai pas raté un seul jour depuis 3 semaines." },
      { name: "Manoel", role: "Projet JNUAF", quote: "Le groupe d'accountability, c'est ce qui m'a fait tenir sur la durée. On ne lâche pas seul." },
    ],
  },
  roadmap: {
    tag: "Roadmap",
    title: "Ce qui arrive bientôt.",
    subtitle: "gool évolue vite. Voici les prochaines fonctionnalités en préparation.",
    items: [
      { status: "Bientôt", t: "Application Android", d: "La version Android arrive très bientôt en bêta publique." },
      { status: "En préparation", t: "Coach vocal IA", d: "Discute à voix haute avec ton coach, comme un vrai appel." },
      { status: "En préparation", t: "Défis entre amis", d: "Lance un défi à un ami et suis vos progrès en parallèle." },
      { status: "À l'étude", t: "Intégration calendrier", d: "Synchronise tes check-ins avec Google Calendar et Apple Calendar." },
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
      { q: "Gool est gratuit ?", a: "Oui, totalement. La beta est ouverte sans carte bancaire. Tu accèdes à toutes les fonctionnalités : coach IA, streaks, groupes et feed." },
      { q: "Comment fonctionne le coach IA ?", a: "Tu déclares ton objectif en une phrase. L'IA génère un plan d'action jour par jour. Tu peux discuter avec elle pour ajuster, demander conseil ou te remotiver à tout moment." },
      { q: "C'est différent de Notion ou Todoist ?", a: "Oui. Gool n'est pas une to-do list — c'est un système combinant coach IA, accountability sociale et gamification. L'objectif n'est pas de cocher des cases, c'est d'atteindre tes objectifs." },
      { q: "Mes données sont-elles privées ?", a: "Oui. Tu choisis ce qui est public (posts, groupes ouverts) et ce qui reste privé. Aucune donnée n'est vendue. L'IA tourne sur une infrastructure sécurisée." },
      { q: "Sur quelles plateformes Gool est disponible ?", a: "iOS, Android et bientôt Web. Synchronisation en temps réel sur tous tes appareils." },
    ],
  },
  finalCta: {
    title1: "Arrête de planifier.",
    title2: "Commence à finir.",
    subtitle: "Rejoins les 1 349 personnes qui ne ratent plus un objectif depuis qu'elles utilisent Gool.",
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
    tag: "60 seconds, tops",
    title: "See gool in under a minute.",
    subtitle: "The video that explains it all: AI coach, streaks, groups and feed — in one minute.",
    playLabel: "Play the gool product video",
    placeholder: "Product video — coming soon",
  },
  pillars: {
    tag: "5 pillars",
    title: "Everything you need, in one app.",
    subtitle: "92% of people abandon their goals before month 3. Gool combines the 5 levers that actually change that.",
    items: [
      { e: "🎯", t: "Personalized AI coach", d: "Set your goal, the AI builds your day-by-day plan. Chat, adjust, get motivated anytime." },
      { e: "🔥", t: "Gamified streaks", d: "1-tap check-in, 10 seconds. Streaks, badges and random nudges bring you back every day." },
      { e: "🏆", t: "XP leaderboard", d: "Every action earns XP. Watch your rank climb and push yourself without noticing." },
      { e: "👥", t: "Accountability groups", d: "Public, private or project-based. Real-time chat, assigned tasks, positive social pressure." },
      { e: "📰", t: "Social feed", d: "Share your wins in photo or video, react, comment. Inspire and get inspired." },
      { e: "✦", t: "Habit loop", d: "Trigger → action → reward → investment. The Hooked model, applied to your goals." },
    ],
  },
  how: {
    tag: "How it works",
    title: "From idea to result, in 6 steps.",
    steps: [
      { n: "01", t: "You set your goal", d: "“Lose 10kg”, “Learn Spanish”. In one sentence." },
      { n: "02", t: "The AI coach builds your plan", d: "Broken down into daily check-ins, matched to your pace and your life." },
      { n: "03", t: "You show up every day", d: "10 seconds, 1 tap. One check-in, every day counts." },
      { n: "04", t: "You track your progress", d: "Progress rings, streaks and XP to see how far you've come." },
      { n: "05", t: "You join a community", d: "Groups, feed and accountability so you never quit alone." },
      { n: "06", t: "You reach your goal", d: "The real result: the goal you set for yourself, achieved." },
    ],
  },
  features: {
    rows: [
      {
        tag: "Daily tracking",
        title: "One check-in. One day won.",
        body: "Every morning, your goal turns into one concrete action. Not an endless to-do list — a single thing, chosen for you by the AI coach.",
        bullets: [
          "Personalized action plan in 60 seconds",
          "Progress rings for every goal",
          "Automatic re-plan if you miss 2 days",
        ],
      },
      {
        tag: "Community",
        title: "Accountability changes everything.",
        body: "Join a feed powered by real users sharing their progress on video. Watching others move forward is the most powerful engine there is.",
        bullets: [
          "For You / Fitness / Learning / Career feed",
          "Video and photo posts, like a mini social network",
          "Public, private or project-based groups",
        ],
      },
      {
        tag: "Streaks & motivation",
        title: "The habit that builds itself.",
        body: "Visual streaks, XP and rankings turn your goals into a game. You won't want to break your streak.",
        bullets: [
          "Duolingo-style visual streaks",
          "+10 XP on every check-in",
          "Leaderboard and badges 🔥 💎 👑",
        ],
      },
      {
        tag: "Sharing progress",
        title: "Your wins, seen by the right people.",
        body: "Every post is tied to a goal. No empty likes: 👏 that actually mean something, comments that push you to keep going.",
        bullets: [
          "Post linked to a goal (e.g. “Lose 10kg”)",
          "👏, ❤️ reactions, comments, sharing",
          "Public profile with your streak and wins",
        ],
      },
    ],
    quote: "“You know what separates people who succeed? Exactly what you're doing right now. Day after day.”",
    quoteFooter: "— message received after a 2-day streak",
  },
  loop: {
    tag: "The loop",
    title: "Why you come back every day, without thinking.",
    subtitle: "The Hooked model, applied to your goals. Four steps that make the difference between an app you download and an app that changes your life.",
    steps: [
      { t: "Trigger", label: "Step 1", d: "Notification: “Your streak is at risk”", e: "🔔" },
      { t: "Action", label: "Step 2", d: "1-tap check-in. 10 seconds.", e: "👆" },
      { t: "Reward", label: "Step 3", d: "Coach message + badge + a leaderboard that moves.", e: "✨" },
      { t: "Investment", label: "Step 4", d: "Streak + XP + followers = high cost of quitting.", e: "💎" },
    ],
  },
  testimonials: {
    tag: "Testimonials",
    title: "What our early testers say.",
    subtitle: "Typical beta profiles, to give you a concrete sense of the gool experience.",
    items: [
      { name: "Anthonio", role: "Weight loss · -10kg in 2 months", quote: "The AI coach gives me a clear plan every morning. I don't have to think anymore, just show up." },
      { name: "Steven", role: "Learning a new language", quote: "Streaks completely changed things for me. I haven't missed a single day in 3 weeks." },
      { name: "Manoel", role: "JNUAF project", quote: "The accountability group is what kept me going. You never quit alone." },
    ],
  },
  roadmap: {
    tag: "Roadmap",
    title: "What's coming next.",
    subtitle: "gool moves fast. Here's what we're building next.",
    items: [
      { status: "Coming soon", t: "Android app", d: "The Android version is landing in public beta very soon." },
      { status: "In progress", t: "Voice AI coach", d: "Talk to your coach out loud, like a real call." },
      { status: "In progress", t: "Friend challenges", d: "Challenge a friend and track your progress side by side." },
      { status: "Exploring", t: "Calendar integration", d: "Sync your check-ins with Google Calendar and Apple Calendar." },
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
      { q: "Is Gool free?", a: "Yes, completely. The beta is open with no credit card. You get access to every feature: AI coach, streaks, groups and feed." },
      { q: "How does the AI coach work?", a: "You state your goal in one sentence. The AI generates a day-by-day action plan. You can chat with it to adjust, ask for advice, or get motivated anytime." },
      { q: "Is it different from Notion or Todoist?", a: "Yes. Gool isn't a to-do list — it's a system combining an AI coach, social accountability and gamification. The point isn't to check boxes, it's to reach your goals." },
      { q: "Is my data private?", a: "Yes. You choose what's public (posts, open groups) and what stays private. No data is ever sold. The AI runs on secure infrastructure." },
      { q: "Which platforms is Gool available on?", a: "iOS, Android and Web soon. Real-time sync across all your devices." },
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
  profile: {
    step: "Étape 1",
    title: "Parlez-nous un peu de vous.",
    subtitle: "Ça nous aide à comprendre ton métier et à te proposer la bonne expérience gool.",
    items: [
      { key: "etudiant", emoji: "🎓", label: "Étudiant" },
      { key: "salarie", emoji: "💼", label: "Salarié(e)" },
      { key: "freelance", emoji: "🧑‍💻", label: "Freelance" },
      { key: "entrepreneur", emoji: "🚀", label: "Entrepreneur" },
      { key: "recherche", emoji: "🔍", label: "En recherche d'emploi" },
      { key: "autre", emoji: "✨", label: "Autre" },
    ],
    jobsTitle: "Quel est ton métier ?",
    jobs: [
      "Ingénieur logiciel", "Data Scientist", "Chef de projet", "Product Manager",
      "UX Designer", "Développeur", "RH", "Commercial",
      "Consultant", "Comptable", "Juriste", "Marketing",
      "Finance", "Enseignant", "Médecin", "Infirmier", "Autre",
    ],
  },
  testerType: {
    step: "Étape 2",
    title: "Testeur interne ou externe ?",
    subtitle: "Les deux te donnent accès à gool. La différence, c'est ton implication.",
    internal: {
      title: "Testeur interne",
      desc: "Tu façonnes gool avec nous : retours directs à l'équipe, et accès à une version plus complète et plus rapide que le public.",
    },
    external: {
      title: "Testeur externe",
      desc: "Tu essaies la version bêta publique de gool. Rapide et simple, en 2 minutes.",
    },
  },
  internalForm: {
    step: "Étape 3",
    title: "Encore quelques infos.",
    subtitle: "Pour rejoindre le programme testeur interne, on a besoin de te contacter.",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse email",
    whatsapp: "Numéro WhatsApp",
    submit: "Continuer →",
    note: "On t'écrira sur WhatsApp pour t'accueillir dans le programme testeur interne.",
  },
  externalForm: {
    stepInternal: "Étape 4",
    stepExternal: "Étape 3",
    titleInternal: "Dernière étape.",
    titleExternal: "Ton adresse email.",
    subtitleInternal: "Confirme ton email pour valider ton accès testeur.",
    subtitleExternal: "Pour recevoir ton accès à la bêta gool.",
    email: "Adresse email",
    submit: "Suivant →",
  },
  download: {
    title: "Merci de rejoindre gool.",
    subtitleInternal: "Bienvenue parmi les testeurs internes. Clique sur le lien et télécharge gool.",
    subtitleExternal: "Clique sur le lien ci-dessous et télécharge gool sur TestFlight.",
    ios: "Télécharger via TestFlight",
    androidNote: "Version Android bientôt disponible — on te préviendra à",
    whatsappCommunity: "Rejoindre notre communauté WhatsApp",
  },
};

/* ============================================================
   Demo flow — EN
   ============================================================ */
const demoEn: DemoDict = {
  back: "← Back",
  home: "← Home",
  step: "Step",
  profile: {
    step: "Step 1",
    title: "Tell us a bit about yourself.",
    subtitle: "This helps us understand your job and offer you the right gool experience.",
    items: [
      { key: "etudiant", emoji: "🎓", label: "Student" },
      { key: "salarie", emoji: "💼", label: "Employee" },
      { key: "freelance", emoji: "🧑‍💻", label: "Freelancer" },
      { key: "entrepreneur", emoji: "🚀", label: "Entrepreneur" },
      { key: "recherche", emoji: "🔍", label: "Job seeker" },
      { key: "autre", emoji: "✨", label: "Other" },
    ],
    jobsTitle: "What's your job?",
    jobs: [
      "Software Engineer", "Data Scientist", "Project Manager", "Product Manager",
      "UX Designer", "Developer", "HR", "Sales",
      "Consultant", "Accountant", "Lawyer", "Marketing",
      "Finance", "Teacher", "Doctor", "Nurse", "Other",
    ],
  },
  testerType: {
    step: "Step 2",
    title: "Internal or external tester?",
    subtitle: "Both give you access to gool. The difference is how involved you are.",
    internal: {
      title: "Internal tester",
      desc: "You help shape gool with us: direct feedback to the team, and access to a more complete, faster version than the public.",
    },
    external: {
      title: "External tester",
      desc: "You try the public beta version of gool. Fast and simple, in 2 minutes.",
    },
  },
  internalForm: {
    step: "Step 3",
    title: "Just a few more details.",
    subtitle: "To join the internal tester program, we need a way to reach you.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    whatsapp: "WhatsApp number",
    submit: "Continue →",
    note: "We'll message you on WhatsApp to welcome you into the internal tester program.",
  },
  externalForm: {
    stepInternal: "Step 4",
    stepExternal: "Step 3",
    titleInternal: "Last step.",
    titleExternal: "Your email address.",
    subtitleInternal: "Confirm your email to validate your tester access.",
    subtitleExternal: "To receive your access to the gool beta.",
    email: "Email address",
    submit: "Next →",
  },
  download: {
    title: "Thanks for joining gool.",
    subtitleInternal: "Welcome aboard as an internal tester. Click the link and download gool.",
    subtitleExternal: "Click the link below and download gool on TestFlight.",
    ios: "Download via TestFlight",
    androidNote: "Android version coming soon — we'll notify you at",
    whatsappCommunity: "Join our WhatsApp community",
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
