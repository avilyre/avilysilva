import { env } from "@root/env";

import { createClient } from "@/prismicio";

export const prismicClient = createClient({
  accessToken: env.PRISMIC_ACCESS_TOKEN,
});
