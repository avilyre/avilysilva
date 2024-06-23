import * as Sentry from "@sentry/nextjs";

type SpanNameType = "Project";
type SpanOpType =
  | "Fetch Projects"
  | "Fetch Project Details"
  | "Fetch Featured Projects";

type SentryParamsType<T> = {
  options: {
    name: SpanNameType;
    op: SpanOpType;
  };
  callback: () => Promise<T>;
};

export const sentry = <T>(params: SentryParamsType<T>) => {
  const { options, callback } = params;

  return Sentry.startSpan<Promise<T>>(options, async () => callback());
};

export const SentryCaptureException = Sentry.captureException;
