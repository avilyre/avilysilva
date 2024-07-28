import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/tag";

import { CardProps } from "./interface";

export const Card = (props: CardProps) => {
  const { image, title, description, tags, typeURL, slug } = props;

  const isPlaceholderEnabled = !!image.placeholderBlur;

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
      className="relative before:absolute before:left-[50%] before:top-[50%] before:z-[-1] before:h-[calc(100%+32px)] before:w-[calc(100%+32px)] before:-translate-x-1/2 before:translate-y-[-50%] before:rounded-md before:bg-tertiary before:opacity-0 before:transition-opacity before:content-[''] hover:before:opacity-35"
    >
      <Link href={hrefURL}>
        <Image
          src={image.src}
          alt={image.alt}
          width={defaultImageSize.width}
          height={defaultImageSize.height}
          placeholder={isPlaceholderEnabled ? "blur" : "empty"}
          blurDataURL={image.placeholderBlur}
          quality={100}
          className="mb-6 aspect-video w-full select-none rounded-md transition-transform"
        />
        <div className="mb-4 flex flex-col gap-4">
          <h3 className="flex flex-col gap-4 text-2xl font-semibold leading-tight text-primary">
            {title}
          </h3>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {tags?.map((tag, index) => <Tag key={index} {...tag} />)}
            </div>
          )}
        </div>
        <p className="text-balance leading-relaxed text-secondary">
          {description}
        </p>
      </Link>
    </article>
  );
};
