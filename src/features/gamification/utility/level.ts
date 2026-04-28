export const xpPerLevel = 20;

export const calculateLevel = (xpTotal: number) => {
  const safeXpTotal = Number.isFinite(xpTotal) && xpTotal > 0 ? xpTotal : 0;
  return Math.floor(safeXpTotal / xpPerLevel) + 1;
};

export const calculateXpToNextLevel = (xpTotal: number) => {
  const level = calculateLevel(xpTotal);
  const nextLevelXp = level * xpPerLevel;
  const remaining = nextLevelXp - xpTotal;
  return remaining > 0 ? remaining : 0;
};
