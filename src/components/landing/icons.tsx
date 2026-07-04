import {
  Target,
  Flame,
  Trophy,
  Users,
  Rss,
  Sparkles,
  Bell,
  MousePointerClick,
  Gem,
  GraduationCap,
  Briefcase,
  Laptop,
  Rocket,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Central icon registry. The i18n dictionaries store a plain string key
 * (e.g. "target") instead of an emoji so the same premium, line-based icon
 * set can be swapped in everywhere without touching copy.
 */
export const ICONS: Record<string, LucideIcon> = {
  target: Target,
  flame: Flame,
  trophy: Trophy,
  users: Users,
  feed: Rss,
  loop: Sparkles,
  bell: Bell,
  tap: MousePointerClick,
  reward: Sparkles,
  invest: Gem,
  student: GraduationCap,
  employee: Briefcase,
  freelance: Laptop,
  rocket: Rocket,
  search: Search,
  other: Sparkles,
  tool: Wrench,
};

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={1.75} aria-hidden />;
}
