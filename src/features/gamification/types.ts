export type QuizOption = {
  id: string;
  label: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  title: string;
  options: QuizOption[];
};

export type QuizDefinition = {
  postId: string;
  version: number;
  isActive: boolean;
  xpReward: number;
  questions: QuizQuestion[];
};

export type QuizQuestionPublic = Omit<QuizQuestion, "options"> & {
  options: Array<Omit<QuizOption, "isCorrect">>;
};

export type QuizPublic = Omit<QuizDefinition, "questions"> & {
  questions: QuizQuestionPublic[];
};

export type QuizAnswer = {
  questionId: string;
  optionId: string;
};

export type QuizSubmitPayload = {
  anonId: string;
  postId: string;
  quizVersion: number;
  answers: QuizAnswer[];
};
