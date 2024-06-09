import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PRISMIC_ACCESS_TOKEN: z.string(),
  },
  runtimeEnv: {
    PRISMIC_ACCESS_TOKEN: process.env.PRISMIC_ACCESS_TOKEN,
  },
});