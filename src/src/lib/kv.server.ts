import process from "node:process";
import { Redis } from "@upstash/redis";

// Server-only Redis client (Upstash, connected via the Vercel Marketplace
// "Upstash for Redis" integration). Reads env vars INSIDE a function so it
// works correctly across serverless invocations. Returns null when the
// integration isn't connected yet (e.g. local dev before Redis is set up) —
// callers should fall back gracefully rather than throw.

let cached: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cached !== undefined) return cached;

  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    cached = null;
    return null;
  }

  cached = new Redis({ url, token });
  return cached;
}
