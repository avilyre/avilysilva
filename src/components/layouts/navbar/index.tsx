"use client";

import Link from "next/link";

import { NavItem } from "@/components/nav-item";

import { strings } from "./strings";

export const Navbar = () => {
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
        <NavItem href="/about">{strings.about}</NavItem>
        <NavItem href="/projects">{strings.projects}</NavItem>
      </div>
    </nav>
  );
};
