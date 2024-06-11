"use client";

import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { Fragment, useState } from "react";

import { GalleryProps } from "./interface";

export const Gallery = (props: GalleryProps) => {
  const { images } = props;

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [keenSliderRef, keenSliderInstanceRef] = useKeenSlider({
    slides: {
      origin: "auto",
      perView: 1.5,
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: {
          perView: 1,
        },
      },
    },
  });

  const genericSliderArraySize = [
    ...Array(
      keenSliderInstanceRef.current?.track.details.slides.length ||
        images.length,
    ).keys(),
  ];

  const defaultImageSize = {
    height: 276,
    width: 528,
  };

  const handleBulletClick = (index: number) => {
    keenSliderInstanceRef.current?.moveToIdx(index);
  };

  return (
    <Fragment>
      <div
        ref={keenSliderRef}
        className="keen-slider no-scrollbar flex w-full select-none"
      >
        {images.map(image => (
          <Image
            key={image.id}
            src={image.src}
            id={`gallery-image-${image.id}`}
            alt={image.alt}
            className={`keen-slider__slide rounded-md`}
            width={defaultImageSize.width}
            height={defaultImageSize.height}
            quality={100}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        {genericSliderArraySize.map(index => (
          <button
            key={index}
            className={`h-[13px] w-[32px] rounded-full transition-[background-color] ${currentSlide === index ? "bg-blue-500" : "bg-tertiary"}`}
            onClick={() => handleBulletClick(index)}
          ></button>
        ))}
      </div>
    </Fragment>
  );
};
