const anonIdStorageKey = "gamification_anon_id";

export const getOrCreateAnonId = () => {
  if (typeof window === "undefined") return null;

  const existing = window.localStorage.getItem(anonIdStorageKey);
  if (existing) return existing;

  const anonId = crypto.randomUUID();
  window.localStorage.setItem(anonIdStorageKey, anonId);
  return anonId;
};
