import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    cover: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    isDraft: z.boolean().default(false),
  }),
});

const quizzes = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/quizzes",
  }),
  schema: z.object({
    postId: z.string(),
    version: z.number().int().positive(),
    isActive: z.boolean().default(true),
    xpReward: z.number().int().nonnegative(),
    questions: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          options: z.array(
            z.object({
              id: z.string(),
              label: z.string(),
              isCorrect: z.boolean(),
            }),
          ),
        }),
      )
      .min(1),
  }),
});

export const collections = { posts, quizzes };
