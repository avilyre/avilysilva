"use client";

import Image from "next/image";
import { Fragment, useState } from "react";

export const Gallery = (props: { images: string[] }) => {
  const { images } = props;

  const defaultImageSize = {
    height: 276,
    width: 528,
  };

  const [currentNumberImage, setCurrentNumberImage] = useState<number>(0);

  const handleBulletClick = (index: number) => {
    setCurrentNumberImage(index);
  };

  return (
    <Fragment>
      <div className="no-scrollbar flex w-full select-none snap-x gap-8 overflow-x-auto scroll-smooth">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            id={`gallery-image-${index}`}
            alt={`Project image ${index + 1}`}
            className="snap-start rounded-md"
            tabIndex={0}
            width={defaultImageSize.width}
            height={defaultImageSize.height}
            quality={100}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        {images.map((_, index) => (
          <a
            key={index}
            href={`#gallery-image-${index}`}
            className={`h-[13px] w-[32px] rounded-full ${currentNumberImage === index ? "bg-blue-500" : "bg-tertiary"}`}
            onClick={() => handleBulletClick(index)}
          ></a>
        ))}
      </div>
    </Fragment>
  );
};
