export const fromArrayToText = (array: string[]) => {
  let text = "";

  for (let i = 0; i < array.length; i++) {
    text += ` ${array[i]}`;
  }

  return text.replace(" ", "");
};
