import type { APIRoute } from "astro";
import { isGamificationEnabled } from "@src/features/gamification/utility/env";
import {
  getActiveQuizForPost,
  toPublicQuiz,
} from "@src/features/gamification/utility/quiz";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!isGamificationEnabled()) {
      return new Response(null, { status: 404 });
    }

    const url = new URL(request.url);
    const postId = url.searchParams.get("postId") || "";

    if (!postId) {
      return new Response(JSON.stringify({ error: "Missing postId." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const quiz = await getActiveQuizForPost(postId);
    if (!quiz) {
      return new Response(JSON.stringify({ error: "Quiz not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const publicQuiz = toPublicQuiz(quiz);

    return new Response(JSON.stringify(publicQuiz), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to load quiz. [500]: " + error }),
      { status: 500 },
    );
  }
};
