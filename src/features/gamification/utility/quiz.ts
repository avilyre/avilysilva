import { getCollection } from "astro:content";
import type {
  QuizAnswer,
  QuizDefinition,
  QuizPublic,
} from "@src/features/gamification/types";

const quizCache = new Map<string, QuizDefinition | null>();

export const getActiveQuizForPost = async (postId: string) => {
  if (quizCache.has(postId)) return quizCache.get(postId) ?? null;

  const quizzes = await getCollection("quizzes");
  const activeQuiz = quizzes
    .map(q => q.data as QuizDefinition)
    .filter(q => q.postId === postId)
    .sort((a, b) => b.version - a.version)
    .find(q => q.isActive);

  const result = activeQuiz ?? null;
  quizCache.set(postId, result);
  return result;
};

export const toPublicQuiz = (quiz: QuizDefinition): QuizPublic => {
  return {
    postId: quiz.postId,
    version: quiz.version,
    isActive: quiz.isActive,
    xpReward: quiz.xpReward,
    questions: quiz.questions.map(question => ({
      id: question.id,
      title: question.title,
      options: question.options.map(option => ({
        id: option.id,
        label: option.label,
      })),
    })),
  };
};

export type QuizValidationResult =
  | { ok: true; correctCount: number; totalQuestions: number }
  | { ok: false; error: string };

export const validateQuizSubmission = (
  quiz: QuizDefinition,
  answers: QuizAnswer[],
): QuizValidationResult => {
  if (!Array.isArray(answers) || answers.length === 0) {
    return { ok: false, error: "Answers cannot be empty." };
  }

  const questionById = new Map(quiz.questions.map(q => [q.id, q]));
  const seenQuestions = new Set<string>();

  let correctCount = 0;

  for (const answer of answers) {
    const { questionId, optionId } = answer ?? {};
    if (!questionId || !optionId) {
      return { ok: false, error: "Invalid answer payload." };
    }

    if (seenQuestions.has(questionId)) {
      return { ok: false, error: "Duplicate question answer." };
    }
    seenQuestions.add(questionId);

    const question = questionById.get(questionId);
    if (!question) {
      return { ok: false, error: "Question does not belong to this quiz." };
    }

    const option = question.options.find(o => o.id === optionId);
    if (!option) {
      return { ok: false, error: "Option does not belong to this question." };
    }

    if (option.isCorrect) correctCount += 1;
  }

  if (seenQuestions.size !== quiz.questions.length) {
    return { ok: false, error: "All questions must be answered." };
  }

  return { ok: true, correctCount, totalQuestions: quiz.questions.length };
};
