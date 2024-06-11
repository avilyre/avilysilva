import { HTMLAttributes } from "react";

type Variant = "h1" | "h2" | "h3";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
  variant?: Variant;
  className?: string;
}
