import { Fragment } from "react";

import { Navbar } from "../navbar";
import { HeaderProps } from "./interface";

export const Header = (props: HeaderProps) => {
  const { page } = props;

  return (
    <header
      data-testid="header"
      className="mb-8 flex flex-col gap-[1.375rem] lg:mb-16"
    >
      <Navbar />

      {page && (
        <Fragment>
          <h1 className="text-4xl font-semibold leading-tight text-primary lg:text-5xl">
            {page.title}
          </h1>
          <h2 className="mt-3 max-w-[384px] text-base leading-relaxed text-secondary">
            {page.description}
          </h2>
        </Fragment>
      )}
    </header>
  );
};
