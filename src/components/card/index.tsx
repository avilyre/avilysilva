import Image from "next/image";
import Link from "next/link";

import { CardProps } from "./interface";

export const Card = (props: CardProps) => {
  const { image, title, description, typeURL, slug } = props;

  const defaultImageSize = {
    width: 380,
    height: 240,
  };

  const hrefURLMap = {
    post: "posts",
    project: "projects",
  };

  const hrefURL = `/${hrefURLMap[typeURL]}/${slug}`;

  return (
    <article
      data-testid="card"
      className="relative after:opacity-0 after:transition-opacity after:ease-in hover:after:absolute hover:after:left-1/2 hover:after:top-1/2 hover:after:z-[-1] hover:after:h-[calc(100%_+_2rem)] hover:after:w-[calc(100%_+_2rem)] hover:after:-translate-x-1/2 hover:after:-translate-y-1/2 hover:after:rounded-md hover:after:bg-slate-900 hover:after:opacity-100 hover:after:content-['']"
    >
      <Link href={hrefURL}>
        <Image
          src={image.src}
          alt={image.alt}
          width={defaultImageSize.width}
          height={defaultImageSize.height}
          className="mb-6 aspect-video w-full select-none rounded-md border-tertiary bg-tertiary object-cover group-hover:border"
        />
        <h3 className="mb-4 font-semibold leading-tight text-primary">
          {title}
        </h3>
        <p className="text-balance leading-relaxed text-secondary">
          {description}
        </p>
      </Link>
    </article>
  );
};
