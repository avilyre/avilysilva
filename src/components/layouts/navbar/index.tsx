"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { strings } from "./strings";

export const Navbar = () => {
  const pathname = usePathname();

  const linkClassesBasedOnActive = (patname: string) => {
    const activeLinkClasses =
      "relative text-primary after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:h-[170%] after:w-[130%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-slate-900 after:content-['']";
    const classesResult =
      pathname === patname ? activeLinkClasses : "text-secondary";
    return classesResult;
  };

  return (
    <nav
      data-testid="navbar"
      className="flex h-[96px] items-center justify-between"
    >
      <Link
        href="/"
        className={`text-[2rem] font-semibold text-primary transition-colors hover:text-secondary`}
      >
        {strings.logoLetter}
      </Link>

      <div className="flex gap-8">
        <Link
          href="/about"
          className={`text-base ${linkClassesBasedOnActive("/about")} underline-offset-8 transition-colors hover:text-primary`}
        >
          {strings.about}
        </Link>
        <Link
          href="/projects"
          className={`text-base ${linkClassesBasedOnActive("/projects")} underline-offset-8 transition-colors hover:text-primary`}
        >
          {strings.projects}
        </Link>
      </div>
    </nav>
  );
};
