import type { APIRoute } from "astro";
import { redis } from "@src/lib/redis";
import { isGamificationEnabled } from "@src/features/gamification/utility/env";
import {
  calculateLevel,
  calculateXpToNextLevel,
} from "@src/features/gamification/utility/level";

export const prerender = false;

const anonIdHeader = "x-anon-id";
const retentionSeconds = 60 * 60 * 24 * 365;

const getAnonIdFromRequest = (request: Request) => {
  return request.headers.get(anonIdHeader) || "";
};

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!isGamificationEnabled()) {
      return new Response(null, { status: 404 });
    }

    const anonId = getAnonIdFromRequest(request);
    if (!anonId) {
      return new Response(JSON.stringify({ error: "Missing anonId." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const xpKey = `gamification:xp:${anonId}`;
    const storedXp = await redis.get<number | string>(xpKey);
    const xpTotal = storedXp ? Number(storedXp) : 0;

    await redis.expire(xpKey, retentionSeconds);

    const level = calculateLevel(xpTotal);
    const xpToNextLevel = calculateXpToNextLevel(xpTotal);

    return new Response(
      JSON.stringify({ anonId, xpTotal, level, xpToNextLevel }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, max-age=10",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch gamification status. [500]: " + error,
      }),
      { status: 500 },
    );
  }
};
