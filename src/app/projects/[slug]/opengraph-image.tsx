/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { getProject } from "@/services/projects.service";

export const runtime = "edge";

export const alt = "project opengraph image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface ImageProps {
  params: {
    slug: string;
  };
}

export default async function Image(props: ImageProps) {
  const {
    params: { slug },
  } = props;

  const { data: project } = await getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <img
          src={project.image.url as string}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt=""
        />
      </div>
    ),
  );
}
