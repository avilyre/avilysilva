import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { HeadingProps } from "./interface";

const variants = {
  h1: "text-5xl font-bold leading-tight text-primary",
  h2: "text-[2rem] font-semibold leading-tight text-primary",
  h3: "text-2xl font-semibold leading-tight text-primary",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props: HeadingProps) => {
    const { title, variant = "h1", className, ...rest } = props;

    const CompElement = variant;
    const compClasses = variants[variant];

    if (!title) return null;

    return (
      <CompElement
        data-testid="heading"
        className={twMerge(compClasses, className)}
        {...rest}
      >
        {title}
      </CompElement>
    );
  },
);

Heading.displayName = "Heading";
