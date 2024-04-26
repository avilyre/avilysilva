import Link from "next/link";

import { strings } from "./strings";

export const Navbar = () => {
  return (
    <nav
      data-testid="navbar"
      className="flex h-[96px] items-center justify-between px-6 lg:px-0"
    >
      <Link
        href="/"
        className="text-[2rem] font-semibold text-primary transition-colors hover:text-secondary"
      >
        {strings.logoLetter}
      </Link>

      <div className="flex gap-4">
        <Link
          href="/about"
          className="text-base text-secondary underline-offset-8 transition-colors hover:text-primary"
        >
          {strings.about}
        </Link>
        <Link
          href="/projects"
          className="text-base text-secondary underline-offset-8 transition-colors hover:text-primary"
        >
          {strings.projects}
        </Link>
      </div>
    </nav>
  );
};
