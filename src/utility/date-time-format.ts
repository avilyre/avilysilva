export const dateTimeFormat = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(date);

  return formatter;
};
