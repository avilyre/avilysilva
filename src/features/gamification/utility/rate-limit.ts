type RedisRateLimitClient = {
  incr: (key: string) => Promise<number>;
  expire: (key: string, seconds: number) => Promise<number>;
};

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; remaining: 0 };

export const rateLimitPerMinute = 10;

export const checkRateLimit = async (
  redisClient: RedisRateLimitClient,
  keyPrefix: string,
  anonId: string,
) => {
  const windowKey = Math.floor(Date.now() / 1000 / 60);
  const key = `${keyPrefix}:${anonId}:${windowKey}`;

  const count = await redisClient.incr(key);
  if (count === 1) {
    await redisClient.expire(key, 60);
  }

  if (count > rateLimitPerMinute) {
    return { ok: false, remaining: 0 } satisfies RateLimitResult;
  }

  return {
    ok: true,
    remaining: rateLimitPerMinute - count,
  } satisfies RateLimitResult;
};
