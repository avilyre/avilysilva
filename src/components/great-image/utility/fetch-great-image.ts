import { plaiceholder } from "@src/lib/plaiceholder";

type FetchGreatImage = {
  src: string;
  baseURL?: string;
  useRemoteBlur?: boolean;
};

export const fetchGreatImage = async (props: FetchGreatImage) => {
  const { src, baseURL, useRemoteBlur = true } = props;

  if (useRemoteBlur) {
    const url = baseURL ? new URL(src, baseURL).href : src;
    const { base64: placeholder, image } = await plaiceholder(url);
    return { placeholder, src: image.src };
  }

  return { placeholder: src, src };
};
