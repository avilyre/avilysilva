import type { APIRoute } from "astro";
import { redis } from "@src/lib/redis";
import { isGamificationEnabled } from "@src/features/gamification/utility/env";
import { calculateLevel } from "@src/features/gamification/utility/level";
import {
  getActiveQuizForPost,
  validateQuizSubmission,
} from "@src/features/gamification/utility/quiz";
import { checkRateLimit } from "@src/features/gamification/utility/rate-limit";
import type { QuizSubmitPayload } from "@src/features/gamification/types";

export const prerender = false;

const retentionSeconds = 60 * 60 * 24 * 365;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!isGamificationEnabled()) {
      return new Response(null, { status: 404 });
    }

    const payload = (await request.json()) as QuizSubmitPayload;

    const anonId = payload?.anonId || "";
    const postId = payload?.postId || "";
    const quizVersion = payload?.quizVersion || 0;
    const answers = payload?.answers || [];

    if (!anonId || !postId || !quizVersion) {
      return new Response(JSON.stringify({ error: "Invalid payload." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const rateLimit = await checkRateLimit(
      redis,
      "gamification:rl:submit",
      anonId,
    );

    if (!rateLimit.ok) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded." }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    const quiz = await getActiveQuizForPost(postId);
    if (!quiz || !quiz.isActive) {
      return new Response(JSON.stringify({ error: "Quiz not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (quiz.version !== quizVersion) {
      return new Response(JSON.stringify({ error: "Invalid quiz version." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const validation = validateQuizSubmission(quiz, answers);
    if (!validation.ok) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const awardKey = `gamification:award:${anonId}:${postId}:${quizVersion}`;
    const awardValue = crypto.randomUUID();

    const awardResult = await redis.set(awardKey, awardValue, {
      nx: true,
      ex: retentionSeconds,
    });

    const xpKey = `gamification:xp:${anonId}`;

    let awarded = false;
    let xpDelta = 0;
    let xpTotal = 0;

    if (awardResult) {
      awarded = true;
      xpDelta = quiz.xpReward;
      xpTotal = await redis.incrby(xpKey, xpDelta);
      await redis.expire(xpKey, retentionSeconds);
    } else {
      const storedXp = await redis.get<number | string>(xpKey);
      xpTotal = storedXp ? Number(storedXp) : 0;
      await redis.expire(xpKey, retentionSeconds);
    }

    const level = calculateLevel(xpTotal);

    return new Response(
      JSON.stringify({
        awarded,
        xpDelta,
        xpTotal,
        level,
        correctCount: validation.correctCount,
        totalQuestions: validation.totalQuestions,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to submit quiz. [500]: " + error }),
      { status: 500 },
    );
  }
};
