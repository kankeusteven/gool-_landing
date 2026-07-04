import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRedis } from "../kv.server";

// Internal tester program: 100 total spots, seeded at 92 remaining. Every
// validated internal signup atomically decrements the shared counter in
// Redis so all visitors see the real remaining count. If Redis isn't
// connected yet (no Upstash integration on the project), we fail soft and
// return the seed value so the demo flow never breaks.

const TOTAL_INTERNAL_SPOTS = 100;
const SEED_REMAINING = 92;
const SPOTS_KEY = "gool:internal_spots_remaining";
const INTERNAL_LIST_KEY = "gool:internal_testers";
const EXTERNAL_LIST_KEY = "gool:external_testers";

const testerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().min(6),
  profile: z.string().nullable().optional(),
  job: z.string().nullable().optional(),
});

export const getInternalSpotsRemaining = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const redis = getRedis();
    if (!redis) return { remaining: SEED_REMAINING, total: TOTAL_INTERNAL_SPOTS };
    const existing = await redis.get<number>(SPOTS_KEY);
    if (existing === null || existing === undefined) {
      await redis.set(SPOTS_KEY, SEED_REMAINING);
      return { remaining: SEED_REMAINING, total: TOTAL_INTERNAL_SPOTS };
    }
    return { remaining: Math.max(0, Number(existing)), total: TOTAL_INTERNAL_SPOTS };
  } catch {
    return { remaining: SEED_REMAINING, total: TOTAL_INTERNAL_SPOTS };
  }
});

export const registerInternalTester = createServerFn({ method: "POST" })
  .inputValidator(testerSchema)
  .handler(async ({ data }) => {
    try {
      const redis = getRedis();
      if (!redis) return { ok: true, remaining: SEED_REMAINING, full: false };

      const currentRaw = await redis.get<number>(SPOTS_KEY);
      const current = currentRaw === null || currentRaw === undefined ? SEED_REMAINING : Number(currentRaw);

      if (current <= 0) {
        return { ok: false, remaining: 0, full: true };
      }

      const remaining = await redis.decr(SPOTS_KEY);
      await redis.lpush(INTERNAL_LIST_KEY, JSON.stringify({ ...data, at: new Date().toISOString() }));

      return { ok: true, remaining: Math.max(0, remaining), full: remaining <= 0 };
    } catch {
      // Never block the user's signup on an infra hiccup.
      return { ok: true, remaining: SEED_REMAINING, full: false };
    }
  });

export const registerExternalTester = createServerFn({ method: "POST" })
  .inputValidator(testerSchema)
  .handler(async ({ data }) => {
    try {
      const redis = getRedis();
      if (redis) {
        await redis.lpush(EXTERNAL_LIST_KEY, JSON.stringify({ ...data, at: new Date().toISOString() }));
      }
      return { ok: true };
    } catch {
      return { ok: true };
    }
  });
